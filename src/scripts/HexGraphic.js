'use strict';

import PIXI from 'pixi.js';

export default class Hex extends PIXI.Graphics {
    constructor(layout, center = new PIXI.Point(0, 0), height = 0, fill = true) {
        super();

        this.layout = layout;
        this.center = center;
        this.color = this.heightToTerrainColor(height);

        if (fill) {
            if (height <= 230) {
                this.beginFill(this.color, 0.5);
            }
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

    heightToTerrainColor(value) {
        if (value > 230) {
            return '0xa6acbe'; // water
        } else if (value <= 230 && value > 180) {
            return '0xd4be7d'; // coast
        } else if (value <= 180 && value > 100) {
            return '0x889d57'; // grass
        } else if (value <= 100 && value > 40) {
            return '0x665441'; // mountains
        } else if (value <= 40) {
            return '0xeaece9'; // snow caps
        }
    }

    heightToHexadecimal(value) {
        let hex = () => {
            var hex = value.toString(16);
            return hex.length == 1 ? '0' + hex : hex;
        };

        return '0x' + hex() + hex() + hex();
    }
}
