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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const models_1 = require("../models");
const initializeAllTables_1 = __importDefault(require("../utils/initializeAllTables"));
const constants_1 = require("../constants");
const jwt_1 = require("../utils/jwt");
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBtYWlsLmNvbSJ9.kjcKCtWwUwL60ajW4bb7uNhq8n5fOBRkOUiTpp_cui4';
let mockUser;
let mockToken;
beforeAll(() => {
    return initializeAllTables_1.default();
});
afterAll(() => {
    return initializeAllTables_1.default();
});
describe('GET /users/by_token', () => {
    it('should decline when token is invalid or no such user exists', (done) => __awaiter(void 0, void 0, void 0, function* () {
        mockUser = yield models_1.User.create({ email: 'bar@foo.com' });
        mockToken = jwt_1.encode(mockUser);
        supertest_1.default(app_1.default)
            .get('/users/by_token')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(404)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.FAILURE);
            expect(res.body.message).toBe('User not found');
            done();
        });
    }));
    it('should respond with user data', done => {
        supertest_1.default(app_1.default)
            .get('/users/by_token')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.OK);
            expect(JSON.stringify(res.body.user)).toBe(JSON.stringify(mockUser));
            done();
        });
    });
});
