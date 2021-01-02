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
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("./config/database"));
const port = process.env.NODE_ENV === 'test'
    ? process.env.TEST_PORT
    : process.env.PORT || '8080';
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server listening on port ${port}..`);
    try {
        yield database_1.default.authenticate();
        console.log('database connected');
    }
    catch (err) {
        console.error(err);
    }
}));
