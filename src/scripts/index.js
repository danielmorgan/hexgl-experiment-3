'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';

class Game {
    constructor() {
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        this.stage = new PIXI.Container();
        this.$container = $('#game');

        this.$container.append(this.renderer.view);

        let text = new PIXI.Text('Hello World!', {
            font: '48px Arial',
            fill: 0xffffff,
            align: 'center'
        });
        text.x = Math.round((window.innerWidth / 2) - (text.width / 2));
        text.y = Math.round((window.innerHeight / 2) - (text.height / 2));
        this.stage.addChild(text);

        this.update();
    }

    update() {
        console.log('update');
        this.renderer.render(this.stage);
        requestAnimationFrame(this.update.bind(this));
    }
}

new Game();
