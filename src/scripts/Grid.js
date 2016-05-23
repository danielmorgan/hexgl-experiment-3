'use strict';

import PIXI from 'pixi.js';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import IterableArray from './Utils/IterableArray';
import Layout from './Coordinates/Layout';
import Axial from './Coordinates/Axial';
import Hex from './Hex';


class Node {
    constructor(layout, q, r, term = 0) {
        this.layout = layout;
        this.axial = new Axial(q, r);
        this.cube = this.axial.toCube();
        this.pixel = this.axial.toPixel(this.layout);
        this.term = term;
    }
}

class Cluster extends Node {
    constructor(radius, layout, q, r, term = 0) {
        super(layout, q, r, term);

        this.radius = radius;
        this.nodes = [];

        let center = new Node(layout, q, r, term);
        this.nodes.push(center);

        center.cube.spiral(radius).forEach(cube => {
            let axial = cube.toAxial();
            this.nodes.push(new Node(layout, axial.q, axial.r, term));
        });
    }
}


export default class Grid {
    constructor(radius) {
        this.size = 0;
        this.radius = radius;

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

        /**
         * Single hex
         */
        if (this.radius === 0) {
            for (let r = 0; r < this.gridHeight; r++) {
                terms.forward(3);
                graph[r] = [];
                for (let q = 0; q < this.gridWidth; q++) {
                    graph[r][q] = new Node(this.layout, q, r, terms.current());
                    terms.next();
                    this.size++;
                }
            }
        }

        /**
         * Radius of hexes
         */
        if (this.radius > 0) {
            for (let r = 0; r < this.gridHeight; r++) {
                terms.forward(3);
                graph[r] = [];
                for (let q = 0; q < this.gridWidth; q++) {
                    if (terms.current() === 0) {
                        graph[r][q] = new Cluster(this.radius, this.layout, q, r, terms.current());
                    }
                    terms.next();
                    this.size++;
                }
            }
        }

        return graph;
    }
}
