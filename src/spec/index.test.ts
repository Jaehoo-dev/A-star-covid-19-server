import request from 'supertest';
import app from '../app';

// beforeAll(() => {
//   process.env.PORT = '4000';
// });

// afterAll(done => {

// });

describe('GET /dangers', () => {
  it('should respond with danger locations', async () => {
    const res = await request(app).get('/dangers');
    expect(res.status).toBe(200);
  });
});
