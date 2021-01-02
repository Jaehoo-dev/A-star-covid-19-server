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
const initializeAllTables_1 = __importDefault(require("../utils/initializeAllTables"));
const models_1 = require("../models");
const jwt_1 = require("../utils/jwt");
const constants_1 = require("../constants");
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBtYWlsLmNvbSJ9.kjcKCtWwUwL60ajW4bb7uNhq8n5fOBRkOUiTpp_cui4';
beforeAll(() => {
    return initializeAllTables_1.default();
});
afterAll(() => {
    return initializeAllTables_1.default();
});
describe('POST /histories/new', () => {
    it('should decline when token is invalid', done => {
        supertest_1.default(app_1.default)
            .post('/histories/new')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(404)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.FAILURE);
            expect(res.body.message).toBe('User not found');
            done();
        });
    });
    const mockCoordinates = {
        startingPoint: 0,
        destination: 100,
    };
    let mockToken;
    it('should create new history when incoming coordinates do not exist in histories', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = yield models_1.User.create({ email: 'baz@bar.com' });
        mockToken = jwt_1.encode(mockUser);
        supertest_1.default(app_1.default)
            .post('/histories/new')
            .set('Authorization', `Bearer ${mockToken}`)
            .send(mockCoordinates)
            .expect(201)
            .end((err, res) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.OK);
            const histories = yield mockUser.getHistories();
            expect(histories).toHaveLength(1);
            done();
        }));
    }));
    it('should not create but update updatedAt when history with incoming coordinates exist', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const oldHistory = yield models_1.History.findOne({
            where: {
                userEmail: 'baz@bar.com',
                coordinates: [mockCoordinates.startingPoint, mockCoordinates.destination],
            },
        });
        supertest_1.default(app_1.default)
            .post('/histories/new')
            .set('Authorization', `Bearer ${mockToken}`)
            .send(mockCoordinates)
            .expect(200)
            .end((err, res) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.OK);
            const updatedHistory = yield models_1.History.findOne({
                where: {
                    userEmail: 'baz@bar.com',
                    coordinates: [mockCoordinates.startingPoint, mockCoordinates.destination],
                },
            });
            expect(updatedHistory.updatedAt.getTime()).toBeGreaterThan(oldHistory.updatedAt.getTime());
            done();
        }));
    }));
    it('should store only up to ten histories', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield models_1.User.findByPk('baz@bar.com');
        for (let i = 0; i < 10; i++) {
            yield user.createHistory({
                coordinates: [i, i + 1],
            });
        }
        supertest_1.default(app_1.default)
            .post('/histories/new')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({
            startingPoint: 200,
            destination: 400,
        })
            .end((err, res) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return done(err);
            const histories = yield user.getHistories();
            expect(histories).toHaveLength(10);
            done();
        }));
    }));
});
describe('GET /histories', () => {
    it('should decline when token is invalid', done => {
        supertest_1.default(app_1.default)
            .get('/histories')
            .set('Authorization', `Bearer ${fakeToken}`)
            .expect(404)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.FAILURE);
            expect(res.body.message).toBe('User not found');
            done();
        });
    });
    it('should respond when token is valid', (done) => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = yield models_1.User.create({ email: 'bar@baz.com' });
        const mockToken = jwt_1.encode(mockUser);
        supertest_1.default(app_1.default)
            .get('/histories')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe(constants_1.RESPONSE_RESULT.OK);
            expect(res.body.histories).toBeTruthy();
            done();
        });
    }));
});
