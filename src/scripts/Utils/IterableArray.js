'use strict';

export default class IterableArray {
    constructor(array) {
        this.array = array;
        this.pointer = 0;
        this.loops = 0;
    }

    next() {
        this.pointer += 1;
        if (this.pointer >= this.array.length) {
            this.pointer = 0;
            this.loops += 1;
        }
        return this.array[this.pointer];
    }

    forward(n) {
        for (let i = 0; i < n; i++) this.next();
    }

    prev() {
        this.pointer -= 1;
        if (this.pointer < 0) {
            this.pointer = 0;
            this.loops -= 1;
        }
        return this.array[this.pointer];
    }

    backward(n) {
        for (let i = 0; i < n; i++) this.prev();
    }

    current() {
        return this.array[this.pointer];
    }
}
