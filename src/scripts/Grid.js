'use strict';

import PIXI from 'pixi.js';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import IterableArray from './Utils/IterableArray';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';
import Hex from './Hex';

export default class Grid {
    constructor() {
        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth * 0.89, height: window.innerHeight * 0.9 },
            { width: 15, height: 15 },
            new PIXI.Point(0, 0),
            true
        );

        let hex = new Hex(this.layout);

        this.pixelHorizontalLimit = (this.layout.bounds.width - hex.width) / (Math.sqrt(3) / 2) - hex.width / 2;
        this.pixelVerticalLimit = (this.layout.bounds.height * 1.5) - hex.height;
        this.gridWidth = Math.floor((this.pixelHorizontalLimit / 7) / hex.width) * 7;
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);

        this.graph = this.generateGraph();

        console.log(this);
    }

    generateGraph() {
        const terms = new IterableArray([0, 1, 2, 3, 4, 5, 6]);
        let graph = [];

        for (let r = 0; r < this.gridHeight; r++) {
            terms.forward(3);
            for (let q = 0; q < this.gridWidth; q++) {
                let axial = new Axial(q, r);

                graph.push({
                    axial: axial,
                    cube: axial.toCube(),
                    pixel: axial.toPixel(this.layout)
                });

                terms.next();
            }
        }

        return graph;
    }
}
