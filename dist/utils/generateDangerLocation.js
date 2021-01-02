"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateDangerLocation(max) {
    return Math.floor(Math.random() * max);
}
exports.default = generateDangerLocation;
