'use strict';

import PIXI from 'pixi.js';

export default class Hex extends PIXI.Graphics {
    constructor(layout, center = new PIXI.Point(0, 0), height = 0, fill = true) {
        super();

        this.layout = layout;
        this.center = center;
        let hexadecimal = Hex.heightToHexadecimal(height);
        console.log(hexadecimal);
        this.color = '0x' + hexadecimal + hexadecimal + hexadecimal;

        if (fill) {
            this.beginFill(this.color, 1);
        } else {
            this.lineStyle(1, 0x000000, 0.1);
        }
        this.drawPolygon(this.points());
        this.endFill();
    }

    points() {
        let points = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.corner(this.center, i);
            points.push(point.x, point.y);
        }

        return points;
    }

    corner(center, i) {
        let angleDeg = 60 * i + this.layout.orientation.startAngle;
        let angleRad = Math.PI / 180 * angleDeg;
        let x = center.x + this.layout.size.width * Math.cos(angleRad);
        let y = center.y + this.layout.size.height * Math.sin(angleRad);

        return new PIXI.Point(x, y);
    }

    static heightToHexadecimal(height) {
        let string = height.toString(16).toUpperCase();
        if (string.length === 1) string = 0 + string;
        return string;
    }
}
