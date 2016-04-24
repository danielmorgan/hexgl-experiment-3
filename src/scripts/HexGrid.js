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
            { width: 15, height: 15 },
            new PIXI.Point(0, 0),
            true
        );

        // grid
        let grid = new Grid(layout);
        let rectangle = grid.rectangle();
        for (let axial of rectangle) {
            let point = axial.toPixel(layout);
            let perlin = noiseGenerator.perlin2(point.x / 100, point.y / 100);
            let color = this.perlinToHeightColor(perlin);
            let hex = new Hex(layout, point, color);
            // this.addChild(this.debug(hex, axial));
            this.addChild(hex);
        }

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
        let height = Math.abs(n) * 256;
        let hex = Math.floor(height).toString(16);
        console.log(hex);
        return '0x' + hex + hex + hex;
    }
}
