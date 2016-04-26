'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import Grid from './Grid';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

export default class HexGrid extends PIXI.Container {
    constructor() {
        super();
        this.draw();
    }

    draw() {
        // layout
        let layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth * 0.9, height: window.innerHeight * 0.9 },
            { width: 10, height: 10 },
            new PIXI.Point(0, 0),
            true
        );

        // grid
        let log = [];
        let grid = new Grid(layout);
        let rectangle = grid.rectangle();
        let simplexNoiseGenerator = new SimplexNoise();
        for (let axial of rectangle) {
            let point = axial.toPixel(layout);
            let perlin = simplexNoiseGenerator.generate(point.x, point.y);
            let color = this.perlinToHeightColor(perlin);
            let hex = new Hex(layout, point, color);
            this.addChild(hex);

            log.push(Math.floor(Math.abs(perlin) * 256));
        }

        console.log(log);
        console.log(Math.min.apply(null, log), Math.max.apply(null, log));

        this.cacheAsBitmap = true;
    }

    perlinToHeightColor(perlin) {
        let height = Math.floor(Math.abs(perlin) * 256);
        return rgbToHex(height, height, height);

        function rgbToHex(r, g, b) {
            return '0X' + componentToHex(r) + componentToHex(g) + componentToHex(b);

            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
        }
    }
}
