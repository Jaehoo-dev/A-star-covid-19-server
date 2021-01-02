"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("./controllers/history.controller");
const verifyToken_1 = __importDefault(require("./middlewares/verifyToken"));
const router = express_1.Router();
router.get('/', verifyToken_1.default, history_controller_1.getHistories);
router.post('/new', verifyToken_1.default, history_controller_1.updateHistories);
exports.default = router;
