"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
const router = express_1.Router();
router.post('/login', auth_controller_1.signInUser);
exports.default = router;
