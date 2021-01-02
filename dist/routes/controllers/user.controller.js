"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = void 0;
const models_1 = require("../../models");
const jwt_1 = require("../../utils/jwt");
const constants_1 = require("../../constants");
const getUserByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt_1.decode(token);
    try {
        const user = yield models_1.User.findByPk(decoded === null || decoded === void 0 ? void 0 : decoded.email);
        if (!user) {
            res.status(404).json({
                result: constants_1.RESPONSE_RESULT.FAILURE,
                message: 'User not found',
            });
            return;
        }
        res.status(200).json({
            result: constants_1.RESPONSE_RESULT.OK,
            user,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserByToken = getUserByToken;
