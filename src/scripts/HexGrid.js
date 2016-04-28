'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';

class IterableArray {
    constructor(array) {
        this.array = array;
        this.pointer = -1;
    }

    next(n = 1) {
        this.pointer += n;
        if (this.pointer >= this.array.length) this.pointer = 0;
        return this.array[this.pointer];
    }

    prev(n = 1) {
        this.pointer -= n;
        if (this.pointer < 0) this.pointer = 0;
        return this.array[this.pointer];
    }

    current() {
        return this.array[this.pointer];
    }
}

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
        //this.gridWidth = Math.floor(this.pixelHorizontalLimit / hex.width);
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);
        this.gridWidth = 42;
        this.pixelWidthRemainder = Math.abs(this.gridWidth - this.layout.bounds.width / this.layout.size.width);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.layout.bounds.height / this.layout.size.height);

        let small = this.rectangle(1);
        //let medium = this.rectangle(2);
        //let large = this.rectangle(4);
        //let giant = this.rectangle(8);
        //small.alpha = 0.4;
        //medium.alpha = 0.3;
        //large.alpha = 0.2;
        //giant.alpha = 0.1;
        this.addChild(small);
        //this.addChild(medium);
        //this.addChild(large);q
        //this.addChild(giant);
    }

    rectangle(s) {
        let container = new PIXI.Container();
        //let terms = new IterableArray([
        //    '0xdddddd',
        //    '0xff0000',
        //    '0x00ff00',
        //    '0x0000ff',
        //    '0xffff00',
        //    '0xff00ff',
        //    '0x00ffff'
        //]);
        let terms = new IterableArray([
            '0x333333',
            '0x777777',
            '0x797979',
            '0x757575',
            '0x888888',
            '0x8a8a8a',
            '0x868686'
        ]);

        console.log(terms);

        let rowsOfTerms = [];
        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            let rowOfTerms = [];
            terms.next();
            terms.next();
            terms.next();
            for (let q = 0; q < this.gridWidth; q++) {
                let coord = new Axial(q, r);
                let pixelCoords = coord.toPixel(this.layout);
                let noise = this.simplexNoiseGenerator.generate(Math.floor(coord.q / s), Math.floor(coord.r / s));
                let color = this.simplexNoiseGenerator.getColor(noise);

                container.addChild(new Hex(this.layout, pixelCoords, terms.current()));
                rowOfTerms.push(terms.pointer);

                terms.next();
            }
            rowsOfTerms.push(rowOfTerms);
        }
        console.table(rowsOfTerms);

        container.cacheAsBitmap = true;

        return container;
    }
}
