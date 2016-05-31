'use strict';

import PIXI from 'pixi.js';
import FastSimplexNoise from 'fast-simplex-noise';
import GradientMask from './Generators/GradientMask';
import HexGraphic from './HexGraphic';
import Grid from './Grid';
import Maths from './Utils/Maths';

export default class World extends PIXI.Container {
    constructor() {
        super();

        this.addChild(this.draw(new Grid(), 1.00));
    }

    draw(grid, alpha = 1) {
        let container = new PIXI.Container();

        let noise = new FastSimplexNoise({
            frequency: 0.07,
            max: 255,
            min: 0,
            octaves: 1
        });
        let gradient = GradientMask.heightMap(grid.graph);

        for (let r = 0; r < grid.graph.length; r++) {
            for (let q = 0; q < grid.graph[r].length; q++) {
                let point = grid.graph[r][q].toPixel(grid.layout);
                let height = Maths.clamp(Math.floor(noise.in2D(q, r) + gradient[r][q]), 0, 255);
                let graphic = new HexGraphic(grid.layout, point, height);
                container.addChild(graphic);
            }
        }

        container.alpha = alpha;
        container.cacheAsBitmap = true;
        return container;
    }
}
