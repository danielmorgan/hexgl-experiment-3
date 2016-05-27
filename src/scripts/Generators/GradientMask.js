'use strict';

export default class GradientMask {
    static heightMap(grid, circles, intensity = 1) {
        let heightMap = [];

        for (let i = 0; i < grid.length; i += 1) {
            heightMap[i] = [];

            for (let j = 0; j < grid[i].length; j += 1) {
                let value = 255 * intensity;

                if (i === Math.floor(grid.length / 2) &&
                    j === Math.floor(grid[i].length / 2)) {
                    value = 0;
                } else {
                    for (let ci = 1; ci < circles.length; ci += 1) {
                        for (let cj = 0; cj < circles[ci].length; cj += 1) {
                            if (circles[ci][cj].q === grid[i][j].q &&
                                circles[ci][cj].r === grid[i][j].r &&
                                circles[ci][cj].s === grid[i][j].s) {
                                value = Math.round(255 - (circles.length - ci) * 255 / circles.length) * intensity;
                            }
                        }
                    }
                }
                heightMap[i][j] = value;
            }
        }

        return heightMap;
    }
}