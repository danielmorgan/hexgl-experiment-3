'use strict';

import PIXI from 'pixi.js';

export default class Hex {
    constructor(q, r, s = null) {
        if (s === null) {
            s = -q-r;
        }

        if (q + r + s === 0) {
            this.q = q;
            this.r = r;
            this.s = s;
        } else {
            throw new Error('Invalid Hex coordinates', 'Coordinates must equal 0 when summed.');
        }
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

    static add(a, b) {
        return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
    }

    static subtract(a, b) {
        return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
    }

    static scale(a, k) {
        return new Hex(a.q * k, a.r * k, a.s * k);
    }

    static direction(direction) {
        return Directions[direction];
    }

    static neighbour(hex, direction) {
        return this.add(hex, this.direction(direction));
    }

    static diagonal(diagonal) {
        return Diagonals[diagonal];
    }

    static diagonalNeighbour(hex, diagonal) {
        return this.add(hex, this.diagonal(diagonal));
    }

    static length(hex) {
        return ((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
    }

    static distance(a, b) {
        return this.length(this.subtract(a, b));
    }
}

const Directions = [
    new Hex(+1, -1,  0), new Hex(+1,  0, -1), new Hex(0, +1, -1),
    new Hex(-1, +1,  0), new Hex(-1,  0, +1), new Hex(0, -1, +1)
];

const Diagonals = [
    new Hex(+2, -1, -1), new Hex(+1, -2, +1), new Hex(-1, -1, +2),
    new Hex(-2, +1, +1), new Hex(-1, +2, -1), new Hex(+1, +1, -2)
];
