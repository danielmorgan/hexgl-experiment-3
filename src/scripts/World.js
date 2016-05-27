'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './Generators/SimplexNoise';
import GradientMask from './Generators/GradientMask';
import HexGraphic from './HexGraphic';
import Grid from './Grid';
import Hex from './Coordinates/Hex';

export default class World extends PIXI.Container {
    constructor() {
        super();

        this.addChild(this.draw(new Grid(), 1.00));
    }

    draw(grid, alpha = 1) {
        let container = new PIXI.Container();

        let perlin = SimplexNoise.heightMap(grid.graph, 100);
        let gradient = GradientMask.heightMap(grid.graph, grid.circles(), 1);

        for (let r = 0; r < grid.graph.length; r++) {
            for (let q = 0; q < grid.graph[r].length; q++) {
                let hex = grid.graph[r][q];
                let point = hex.toPixel(grid.layout);
                let height = clamp(perlin[r][q] + gradient[r][q], 0, 255);
                let graphic = new HexGraphic(grid.layout, point, height);
                container.addChild(graphic);
            }
        }

        container.alpha = alpha;
        container.cacheAsBitmap = true;
        return container;
    }
}

let clamp = function(value, min, max) {
    return Math.max(min, Math.min(max, value));
}