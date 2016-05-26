'use strict';

import PIXI from 'pixi.js';
import SimplexNoise from './SimplexNoise';
import HexGraphic from './HexGraphic';
import Axial from './Coordinates/Hex';
import Grid from './Grid';


export default class World extends PIXI.Container {
    constructor() {
        super();

        this.addChild(this.draw(new Grid(), 1.00));
    }

    draw(grid, alpha = 1) {
        let container = new PIXI.Container();
        let noise = new SimplexNoise();

        //container.addChild(new HexGraphic(grid.layout, node.pixel, color));

        container.alpha = alpha;
        container.cacheAsBitmap = true;
        return container;
    }
}
