'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import Stats from 'stats.js';
import HexGrid from './HexGrid';

class Game {
    constructor() {
        this.renderer = new PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight,
            { backgroundColor: 0xd6cca9 }
        );
        this.stage = new PIXI.Container();
        this.$container = $('#game');
        this.stats = new Stats();

        this.$container.append(this.renderer.view);
        this.$container.append(this.stats.dom);

        this.setTheStage();
        this.update();
    }

    setTheStage() {
        let hexGrid = new HexGrid();
        this.stage.addChild(hexGrid);
    }

    update() {
        this.stats.begin();
        this.renderer.render(this.stage);
        this.stats.end();
        requestAnimationFrame(this.update.bind(this));
    }
}

$(function() {
    window.game = new Game();
});
