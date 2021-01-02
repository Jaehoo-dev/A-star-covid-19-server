"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const danger_controller_1 = require("./controllers/danger.controller");
const router = express_1.Router();
router.get('/', danger_controller_1.getDangerLocations);
exports.default = router;
