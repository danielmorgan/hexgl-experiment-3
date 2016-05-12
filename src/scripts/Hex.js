'use strict';

import PIXI from 'pixi.js';

export default class Hex extends PIXI.Graphics {
    constructor(layout, center = new PIXI.Point(0, 0), color = 0x000000, outline = false, q = 0, r = 0, term) {
        super();

        this.layout = layout;
        this.center = center;
        this.color = color;
        this.q = q;
        this.r = r;
        this.term = term;

        if (outline) {
            this.lineStyle(1, 0x000000, 0.1);
        } else {
            this.beginFill(this.color, 1);
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
}
