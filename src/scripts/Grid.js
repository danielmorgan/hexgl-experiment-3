'use strict';

import Axial from './Coordinates/Axial';
import Hex from './Hex';

export default class Grid {
    constructor(layout) {
        let hex = new Hex(layout);
        let constraintOffset = (layout.constrain) ? -1 : 1;

        this.pixelWidth = layout.bounds.width;
        this.pixelHeight = layout.bounds.height * 1.5;
        this.gridWidth = Math.round(this.pixelWidth / hex.width) + constraintOffset;
        this.gridHeight = Math.round(this.pixelHeight / hex.height) + constraintOffset - 1;
        this.pixelWidthRemainder = Math.abs(this.gridWidth - this.pixelWidth / layout.size.width);
        this.pixelHeightRemainder = Math.abs(this.gridHeight - this.pixelHeight / layout.size.height);
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
