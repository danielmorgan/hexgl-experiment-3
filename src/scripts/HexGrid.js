'use strict';

import PIXI from 'pixi.js';
import Hex from './Hex';
import Grid from './Grid';
import { LAYOUT_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

export default class HexGrid extends PIXI.Container {
    constructor() {
        super();
        this.draw();
    }

    draw() {
        // layout
        let layout = new Layout(
            LAYOUT_POINTY,
            { width: window.innerWidth, height: window.innerHeight },
            { width: 25, height: 25 },
            new PIXI.Point(0, 0),
            true
        );

        // grid
        let grid = new Grid(layout);
        let rectangle = grid.rectangle();
        for (let axial of rectangle) {
            let point = axial.toPixel(layout);
            let hex = new Hex(layout, point);
            // this.addChild(this.debug(hex));
            this.addChild(hex);
        }

        if (layout.constrain) {
            this.x = grid.pixelWidthRemainder / 2;
            this.y = grid.pixelHeightRemainder / 2;
        }

        this.cacheAsBitmap = true;
    }

    debug(hex) {
        let b = hex.getBounds();
        let g = new PIXI.Graphics();
        g.beginFill(0xff0000, 1);
        g.drawRect(b.x, b.y, b.width, b.height);
        g.endFill();

        return g;
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '0x';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }
}
