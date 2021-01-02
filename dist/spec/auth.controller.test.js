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
beforeAll(() => {
    return initializeAllTables_1.default();
});
afterAll(() => {
    return initializeAllTables_1.default();
});
describe('POST /login', () => {
    test('should have no users initially', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield models_1.User.findAll();
        expect(users).toHaveLength(0);
        done();
    }));
    it('should create user when no user is found with email', done => {
        supertest_1.default(app_1.default)
            .post('/auth/login')
            .send({ email: 'foo@bar.com' })
            .expect(201)
            .end((err, res) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return done();
            expect(res.body.token).toBeTruthy();
            const user = yield models_1.User.findOne({
                where: {
                    email: 'foo@bar.com',
                },
            });
            expect(user).toBeTruthy();
            expect(user.email).toBe('foo@bar.com');
            done();
        }));
    });
    it('should sign in user when user exists', done => {
        supertest_1.default(app_1.default)
            .post('/auth/login')
            .send({ email: 'foo@bar.com' })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    });
});
