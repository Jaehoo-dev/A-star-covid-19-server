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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHistories = exports.getHistories = void 0;
const database_1 = __importDefault(require("../../config/database"));
const constants_1 = require("../../constants");
const getHistories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        const histories = yield user.getHistories();
        res.status(200).json({
            result: constants_1.RESPONSE_RESULT.OK,
            histories,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getHistories = getHistories;
const updateHistories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { startingPoint, destination } = req.body;
    const t = yield database_1.default.transaction();
    try {
        const [history] = yield user.getHistories({
            where: {
                coordinates: [startingPoint, destination]
            }
        }, { transaction: t });
        if (history) {
            history.changed('updatedAt', true);
            yield history.save({ transaction: t });
            yield t.commit();
            res.status(200).json({
                result: constants_1.RESPONSE_RESULT.OK,
            });
            return;
        }
        ;
        let numberOfHistories = yield user.countHistories({}, { transaction: t });
        while (numberOfHistories > 9) {
            const [oldestHistory] = yield user.getHistories({
                limit: 1,
                order: [['updatedAt', 'ASC']]
            }, { transaction: t });
            yield oldestHistory.destroy({}, { transaction: t });
            numberOfHistories = yield user.countHistories({}, { transaction: t });
        }
        yield user.createHistory({
            coordinates: [startingPoint, destination],
        }, { transaction: t });
        yield t.commit();
        res.status(201).json({
            result: constants_1.RESPONSE_RESULT.OK,
        });
    }
    catch (err) {
        yield t.rollback();
        next(err);
    }
});
exports.updateHistories = updateHistories;
