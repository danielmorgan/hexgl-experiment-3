'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';
import IterableArray from './Utils/IterableArray';

const terms = new IterableArray(['0x333333', '0x777777', '0x797979', '0x757575', '0x888888', '0x8a8a8a', '0x868686']);

export default class HexGrid extends PIXI.Container {
    constructor() {
        super();

        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth * 0.89, height: window.innerHeight * 0.9 },
            { width: 10, height: 10 },
            new PIXI.Point(0, 0),
            true
        );

        this.simplexNoiseGenerator = new SimplexNoise();

        let hex = new Hex(this.layout);
        this.pixelHorizontalLimit = (this.layout.bounds.width - hex.width) / (Math.sqrt(3) / 2) - hex.width / 2;
        this.pixelVerticalLimit = (this.layout.bounds.height * 1.5) - hex.height;
        this.gridWidth = Math.floor(this.pixelHorizontalLimit / hex.width);
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);
        this.pixelWidthRemainder = Math.abs(this.gridWidth - this.layout.bounds.width / this.layout.size.width);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.layout.bounds.height / this.layout.size.height);

        this.addChild(this.parallelogramRadius1(1));
    }

    parallelogramRadius1() {
        let container = new PIXI.Container();

        let color = this.simplexNoiseGenerator.getColor(this.simplexNoiseGenerator.generate(0, 0));

        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            terms.forward(3);

            for (let q = 0; q < this.gridWidth; q++) {
                let coord = new Axial(q, r);
                let pixelCoords = coord.toPixel(this.layout);

                if (true) {
                    color = this.simplexNoiseGenerator.getColor(this.simplexNoiseGenerator.generate(Math.floor(coord.q), Math.floor(coord.r)));
                }
                container.addChild(new Hex(this.layout, pixelCoords, color));

                terms.next();
            }
        }

        container.cacheAsBitmap = true;
        return container;
    }
}
