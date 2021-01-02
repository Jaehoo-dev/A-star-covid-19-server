"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDangerLocations = void 0;
const generateDangerLocation_1 = __importDefault(require("../../utils/generateDangerLocation"));
const constants_1 = require("../../constants");
const constants_2 = require("../../constants");
const getDangerLocations = (req, res, next) => {
    const dangerLocations = [];
    const numberOfDangerLocations = Math.floor(Math.random() * constants_2.NUMBER.DANGERS) + constants_2.NUMBER.DANGERS_OFFSET;
    for (let i = 0; i < numberOfDangerLocations; i++) {
        dangerLocations.push(generateDangerLocation_1.default(constants_2.NUMBER.ROWS * constants_2.NUMBER.COLUMNS));
    }
    res.status(200).json({
        result: constants_1.RESPONSE_RESULT.OK,
        dangerLocations,
    });
};
exports.getDangerLocations = getDangerLocations;
