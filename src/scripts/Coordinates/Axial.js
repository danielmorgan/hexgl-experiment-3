'use strict';

import PIXI from 'pixi.js';
import Cube from './Cube';

export default class Axial {
    constructor(q, r) {
        this.q = (Object.is(-0, q)) ? Math.abs(q) : q;
        this.r = (Object.is(-0, r)) ? Math.abs(r) : r;
    }

    toCube() {
        let x = this.q;
        let z = this.r;
        let y = -x - z;
        
        return new Cube(x, y, z);
    }

    toPixel(layout) {
        let o = layout.orientation;
        let w = layout.size.width;
        let h = layout.size.height;
        let q = this.q;
        let r = this.r;

        let x = (o.f0 * q + o.f1 * r) * w;
        x += layout.origin.x;
        if (layout.constrain) x += layout.size.width;

        let y = (o.f2 * q + o.f3 * r) * h;
        x += layout.origin.y
        if (layout.constrain) y += layout.size.height;

        return new PIXI.Point(x, y);
    }

    apply(axial) {
        let q = this.q + axial.q;
        let r = this.r + axial.r;

        return new Axial(q, r);
    }

    neighbours() {
        let neighbours = [];
        for (let direction of Directions) {
            neighbours.push(this.apply(direction));
        }

        return neighbours;
    }
}

export const Directions = [
    new Axial(+1,  0), new Axial(+1, -1), new Axial(0, -1),
    new Axial(-1, 0), new Axial(-1, +1), new Axial(0, +1)
];
