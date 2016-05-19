'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import Hex from './Hex';
import Axial from './Coordinates/Axial';
import Grid from './Grid';


export default class HexGrid extends PIXI.Container {
    constructor() {
        super();

        //this.addChild(this.draw(new Grid(0)));
        this.addChild(this.draw(new Grid(1), 1.00));
    }

    draw(grid, alpha = 1) {
        let container = new PIXI.Container();
        let noise = new SimplexNoise();

        grid.graph.forEach(row => {
            row.forEach(node => {
                let color = noise.getColor(node.pixel.x, node.pixel.y);

                if (grid.radius > 0) {
                    let cluster = node;
                    cluster.nodes.forEach(n => {
                        console.log(n);
                        container.addChild(new Hex(grid.layout, n.pixel, color))
                    });
                }

                container.addChild(new Hex(grid.layout, node.pixel, color));
            });
        });

        container.alpha = alpha;
        container.cacheAsBitmap = true;
        return container;
    }
}
