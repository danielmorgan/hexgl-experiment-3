'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';
import IterableArray from './Utils/IterableArray';

const terms = new IterableArray([0, 1, 2, 3, 4, 5, 6]);

export default class HexGrid extends PIXI.Container {
    constructor() {
        super();

        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth * 0.89, height: window.innerHeight * 0.9 },
            { width: 15, height: 15 },
            new PIXI.Point(0, 0),
            true
        );

        this.simplexNoiseGenerator = new SimplexNoise();

        let hex = new Hex(this.layout);
        this.pixelHorizontalLimit = (this.layout.bounds.width - hex.width) / (Math.sqrt(3) / 2) - hex.width / 2;
        this.pixelVerticalLimit = (this.layout.bounds.height * 1.5) - hex.height;
        this.gridWidth = Math.floor((this.pixelHorizontalLimit / 7) / hex.width) * 7;
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);

        this.addChild(this.radius0());
        this.addChild(this.radius1());
    }

    radius0() {
        let container = new PIXI.Container();

        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            terms.forward(3);
            for (let q = 0; q < this.gridWidth; q++) {
                let coord = new Axial(q, r);
                let pixelCoords = coord.toPixel(this.layout);
                let color = this.simplexNoiseGenerator.getColor(pixelCoords.x, pixelCoords.y);
                container.addChild(new Hex(this.layout, pixelCoords, color, false, q, r, terms.current()));
                terms.next();
            }
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
