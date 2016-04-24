'use strict';

import PIXI from 'pixi.js';
let Noise = require('noisejs');
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
        let noiseGenerator = new Noise.Noise(Math.random())

        // layout
        let layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth, height: window.innerHeight },
            { width: 5, height: 5 },
            new PIXI.Point(0, 0),
            true
        );

        // grid
        let log = [];
        let grid = new Grid(layout);
        let rectangle = grid.rectangle();
        for (let axial of rectangle) {
            let point = axial.toPixel(layout);
            let perlin = noiseGenerator.perlin2(point.x, point.y);
            let color = this.perlinToHeightColor(perlin);
            let hex = new Hex(layout, point, color);
            // this.addChild(this.debug(hex, axial));
            this.addChild(hex);

            log.push(Math.abs(perlin) * 255);
        }

        console.log(log);

        this.cacheAsBitmap = true;
    }

    debug(hex, axial) {
        let b = hex.getBounds();
        let g = new PIXI.Graphics();
        g.beginFill(0xff0000, 0.5);
        g.drawRect(b.x, b.y, b.width, b.height);
        g.endFill();

        let t = new PIXI.Text(axial.q + ', ' + axial.r, {
            font: Math.round(hex.layout.size.width / 2) + 'px Arial'
        });
        t.anchor = new PIXI.Point(0.5, 0.5);
        t.x = Math.round(b.x + b.width/2);
        t.y = Math.round(b.y + b.height/2);

        return t;
    }

    randomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '0x';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    randomGrey() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '0x';
        var letter = Math.floor(Math.random() * letters.length);
        for (var i = 0; i < 6; i++ ) {
            color += letters[letter];
        }
        return color;
    }

    perlinToHeightColor(n) {
        let height = Math.floor(Math.abs(n) * 256);
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
