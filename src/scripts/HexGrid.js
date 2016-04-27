'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';

export default class HexGrid extends PIXI.Container {
    constructor() {
        super();

        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth, height: window.innerHeight },
            { width: 15, height: 15 },
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

        let small = this.rectangle(1);
        let medium = this.rectangle(2);
        let large = this.rectangle(4);
        let giant = this.rectangle(8);
        small.alpha = 0.4;
        medium.alpha = 0.3;
        large.alpha = 0.2;
        giant.alpha = 0.1;
        this.addChild(small);
        this.addChild(medium);
        this.addChild(large);
        this.addChild(giant);
    }

    rectangle(s) {
        let container = new PIXI.Container();

        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            for (let q = -rOffset; q < this.gridWidth - rOffset; q++) {
                let coord = new Axial(q, r);
                let pixelCoords = coord.toPixel(this.layout);
                let noise = this.simplexNoiseGenerator.generate(Math.floor(coord.q / s), Math.floor(coord.r / s));
                let color = this.simplexNoiseGenerator.getColor(noise);
                container.addChild(new Hex(this.layout, pixelCoords, color));
            }
        }

        container.cacheAsBitmap = true;

        return container;
    }
}
