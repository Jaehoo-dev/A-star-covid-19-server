"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('GET /dangers', () => {
    it('should respond with danger locations', done => {
        supertest_1.default(app_1.default)
            .get('/dangers')
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.result).toBe('ok');
            expect(res.body.dangerLocations).toBeTruthy();
            done();
        });
    });
    it('should return danger locations of length between 3 and 7', done => {
        for (let i = 0; i < 10; i++) {
            supertest_1.default(app_1.default)
                .get('/dangers')
                .end((err, res) => {
                if (err)
                    return done(err);
                expect(res.body.dangerLocations.length).toBeGreaterThanOrEqual(3);
                expect(res.body.dangerLocations.length).toBeLessThanOrEqual(7);
                done();
            });
        }
    });
});
