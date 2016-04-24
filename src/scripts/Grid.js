'use strict';

import Axial from './Coordinates/Axial';
import Hex from './Hex';

export default class Grid {
    constructor(layout) {
        let hex = new Hex(layout);
        this.pixelHorizontalLimit = (layout.bounds.width - hex.width) / (Math.sqrt(3) / 2) - hex.width / 2;
        this.pixelVerticalLimit = (layout.bounds.height * 1.5) - hex.height;
        this.gridWidth = Math.floor(this.pixelHorizontalLimit / hex.width);
        this.gridHeight = Math.floor(this.pixelVerticalLimit / hex.height);
        this.pixelWidthRemainder = Math.abs(this.gridWidth - layout.bounds.width / layout.size.width);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - layout.bounds.height / layout.size.height);
    }

    parallelogram() {
        let coords = [];
        
        for (let q = 0; q <= this.gridWidth; q++) {
            for (let r = 0; r <= this.gridHeight; r++) {
                coords.push(new Axial(q, r));
            }
        }

        return coords;
    }

    rectangle() {
        let coords = [];

        for (let r = 0; r < this.gridHeight; r++) {
            let rOffset = Math.floor(r / 2);
            for (let q = -rOffset; q < this.gridWidth - rOffset; q++) {
                coords.push(new Axial(q, r));
            }
        }

        return coords;
    }
}
