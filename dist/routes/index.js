"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const danger_1 = __importDefault(require("./danger"));
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const histories_1 = __importDefault(require("./histories"));
const router = express_1.Router();
router.use('/dangers', danger_1.default);
router.use('/auth', auth_1.default);
router.use('/users', users_1.default);
router.use('/histories', histories_1.default);
exports.default = router;
