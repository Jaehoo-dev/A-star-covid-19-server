"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use('/', index_1.default);
app.use((req, res, next) => {
    next(http_errors_1.default(404, 'not found'));
});
app.use((err, req, res, next) => {
    console.error(err);
    const message = err.statusCode === 404
        ? err.message
        : 'internal server error';
    res
        .status(err.statusCode || 500)
        .json({
        result: 'failure',
        message,
    });
});
exports.default = app;
