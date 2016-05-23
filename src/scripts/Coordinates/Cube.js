'use strict';

import Axial from './Axial';

export default class Cube {
    constructor(x, y, z) {
        if (x + y + z === 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        } else {
            throw new Error('Invalid Cube coordinates', 'Coordinates must equal 0 when summed.');
        }
    }

    toAxial() {
        return new Axial(this.x, this.z);
    }

    toPixel() {
        return this.toAxial().toPixel();
    }

    apply(cube) {
        let x = this.x + cube.x;
        let y = this.y + cube.y;
        let z = this.z + cube.z;

        return new Cube(x, y, z);
    }

    direction(direction) {
        return Directions[direction];
    }

    neighbour(direction) {
        return this.apply(this.direction(direction));
    }

    distance(target) {
        return (Math.abs(this.x - target.x) + Math.abs(this.y - target.y) + Math.abs(this.z - target.z)) / 2;
    }

    scale(scale) {
        let x = this.x * scale;
        let y = this.y * scale;
        let z = this.z * scale;

        return new Cube(x, y, z);
    }

    ring(radius) {
        let results = [];
        let cube = this.apply(this.scale(radius));

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < radius; j++) {
                cube = this.neighbour(i);
                results.push(cube);
            }
        }

        return results;
    }

    spiral(radius) {
        let results = [];

        for (let i = 1; i <= radius; i++) {
            this.ring(i).forEach(cube => {
                results.push(cube);
            });
        }

        return results;
    }
}

export const Directions = [
    new Cube(+1, -1,  0), new Cube(+1,  0, -1), new Cube(0, +1, -1),
    new Cube(-1, +1,  0), new Cube(-1,  0, +1), new Cube(0, -1, +1)
];
