'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import HexGraphic from './HexGraphic';
import Grid from './Grid';

export default class World extends PIXI.Container {
    constructor() {
        super();

        this.addChild(this.draw(new Grid(), 1.00));
    }

    draw(grid, alpha = 1) {
        let container = new PIXI.Container();
        let noise = new SimplexNoise();

        for (let r = 0; r < grid.graph.length; r++) {
            for (let q = 0; q < grid.graph[r].length; q++) {
                let hex = grid.graph[r][q];
                let point = hex.toPixel(grid.layout);
                let color = noise.getColor(point);
                let graphic = new HexGraphic(grid.layout, point, color);
                container.addChild(graphic);
            }
        }

        container.alpha = alpha;
        container.cacheAsBitmap = true;
        return container;
    }
}
