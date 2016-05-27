'use strict';

import PIXI from 'pixi.js';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';
import Hex from './Coordinates/Hex';
import HexGraphic from './HexGraphic';

export default class Grid {
    constructor() {
        this.size = 0;
        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: window.innerWidth * 0.89, height: window.innerHeight * 0.9 },
            { width: 15, height: 15 },
            new PIXI.Point(0, 0),
            true
        );
        let hex = new HexGraphic(this.layout);
        this.pixelHorizontalLimit = (this.layout.bounds.width - hex.width) / (Math.sqrt(3) / 2) - hex.width / 2;
        this.pixelVerticalLimit = (this.layout.bounds.height * 1.5) - hex.height;
        this.gridWidth = Math.floor((this.pixelHorizontalLimit / 7) / hex.width) * 7;
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);

        this.graph = this.generateGraph();

        console.log(this);
    }

    generateGraph() {
        var graph = [];

        for (var r = 0; r < this.gridHeight; r++) {
            graph[r] = [];
            for (var q = 0; q < this.gridWidth; q++) {
                graph[r][q] = new Hex(q, r);
                this.size++;
            }
        }
        return graph
    }

    circles() {
        let halfWidth = Math.round(this.gridWidth / 2);
        let halfHeight = Math.round(this.gridHeight / 2);
        let maxRadius = Math.max(halfWidth, halfHeight);
        let center = this.graph[halfHeight][halfWidth];

        let circles = [];

        for (let radius = 1; radius < maxRadius; radius++) {
            circles[radius] = Hex.ring(center, radius);
        }

        return circles;
    }
}
