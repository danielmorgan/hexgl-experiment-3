'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import Axial from './Coordinates/Axial';
import Grid from './Grid';


export default class HexGrid extends PIXI.Container {
    constructor() {
        super();

        this.addChild(this.radius0());
        //this.addChild(this.radius1());
    }

    radius0() {
        let container = new PIXI.Container();
        let noise = new SimplexNoise();
        let grid = new Grid();

        for (let node of grid.graph) {
            let color = noise.getColor(node.pixel.x, node.pixel.y);
            let hex = new Hex(grid.layout, node.pixel, color);
            container.addChild(hex);
        }

        container.alpha = 1;
        container.cacheAsBitmap = true;
        return container;
    }

    radius1() {
        let hexes = this.getChildAt(0).children;
        let centerHexes = hexes.filter(h => h.term === 3);
        let container = new PIXI.Container();

        for (let center of centerHexes) {
            let coords = new Axial(center.q, center.r);
            let pixelCoords = coords.toPixel(this.layout);
            let color = this.simplexNoiseGenerator.getColor(pixelCoords.x, pixelCoords.y);
            container.addChild(new Hex(this.layout, pixelCoords, color, false, coords.q, coords.r));

            for (let neighbour of coords.neighbours()) {
                if (neighbour.q >= 0 &&
                    neighbour.q < this.gridWidth &&
                    neighbour.r >= 0 &&
                    neighbour.r < this.gridHeight) {
                    container.addChild(new Hex(this.layout, neighbour.toPixel(this.layout), color, false, neighbour.q, neighbour.r));
                }
            }
        }

        container.alpha = 0.66;
        container.cacheAsBitmap = true;
        return container;
    }
}
