'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import Stats from 'stats.js';
import World from './World';

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
        this.stats.mode = 1;

        this.$container.append(this.renderer.view);
        $('body').append($(this.stats.dom).addClass('stats'));

        this.bindEvents();
        this.setTheStage();
        this.update();
    }

    bindEvents() {
        // Stats controls
        console.info("Stats.js\n===================\n[H] Show/hide panel\n[J] Change panel")
        $(window).on('keydown', e => {
            if (e.keyCode === 72) $(this.stats.dom).toggle();
            if (e.keyCode === 74) this.stats.showPanel(this.stats.mode++ % 3);
        })
    }

    setTheStage() {
        let world = new World();
        this.stage.addChild(world);
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
