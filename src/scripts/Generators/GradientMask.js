'use strict';

export default class GradientMask {
    static heightMap(graph, circles, intensity = 1) {
        let heightMap = [];

        for (let r = 0; r < graph.length; r++) {
            heightMap[r] = [];
            for (let q = 0; q < graph[r].length; q++) {
                let y = r / graph.length * 2 - 1;
                let x = q / graph[r].length * 2 - 1;
                let value = Math.max(Math.abs(x), Math.abs(y));

                heightMap[r][q] = Math.floor(value * 255);
            }
        }

        return heightMap;
    }
}
