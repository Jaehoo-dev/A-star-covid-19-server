import request from 'supertest';
import app from '../app';

describe('GET /dangers', () => {
  it('should respond with danger locations', async done => {
    request(app)
      .get('/dangers')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe('ok');
        expect(res.body.dangerLocations).toBeTruthy();
        done();
      });
  });

  it('should return danger locations of length between 3 and 7', async done => {
    for (let i = 0; i < 10; i++) {
      request(app)
        .get('/dangers')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.dangerLocations.length).toBeGreaterThanOrEqual(3);
          expect(res.body.dangerLocations.length).toBeLessThanOrEqual(7);
          done();
        });
    }
  });
});
