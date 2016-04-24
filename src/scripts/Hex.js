'use strict';

import PIXI from 'pixi.js';

export default class Hex extends PIXI.Graphics {
    constructor(layout, center = new PIXI.Point(0, 0)) {
        super();

        this.center = center;
        this.layout = layout;

        this.beginFill(0x000000, 0);
        this.lineStyle(1, 0x000000, 0.2);
        this.drawPolygon(this.hexCoords());
        this.endFill();
    }

    hexCoords() {
        let coords = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.cornerPoint(this.center, i);
            coords.push(point.x, point.y);
        }

        return coords;
    }

    cornerPoint(center, i) {
        let angleDeg = 60 * i + this.layout.orientation.startAngle;
        let angleRad = Math.PI / 180 * angleDeg;
        let x = center.x + this.layout.size.width * Math.cos(angleRad);
        let y = center.y + this.layout.size.height * Math.sin(angleRad);

        return new PIXI.Point(x, y);
    }
}
