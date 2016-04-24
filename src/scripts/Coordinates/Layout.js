'use strict';

export default class Layout {
    constructor(orientation, bounds, size, origin, constrain = false) {
        this.orientation = orientation,
        this.bounds = bounds;
        this.size = size;
        this.origin = origin;
        this.constrain = constrain;
    }
}
