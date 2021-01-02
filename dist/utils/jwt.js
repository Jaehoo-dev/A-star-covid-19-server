"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function encode(data) {
    return jsonwebtoken_1.default.sign(JSON.stringify(data), process.env.JWT_SECRET_KEY);
}
exports.encode = encode;
function decode(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err || !decoded)
            return;
        return decoded;
    });
}
exports.decode = decode;
