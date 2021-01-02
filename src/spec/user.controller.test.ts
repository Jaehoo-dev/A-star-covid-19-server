import request from 'supertest';
import app from '../app';
import { User } from '../models';
import initializeAllTables from '../utils/initializeAllTables';
import { RESPONSE_RESULT } from '../constants';
import { encode } from '../utils/jwt';

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBtYWlsLmNvbSJ9.kjcKCtWwUwL60ajW4bb7uNhq8n5fOBRkOUiTpp_cui4';
let mockUser: User;
let mockToken: string;

beforeAll(() => {
  return initializeAllTables();
});

afterAll(() => {
  return initializeAllTables();
});

describe('GET /users/by_token', () => {
  it('should decline when token is invalid or no such user exists', async done => {
    mockUser = await User.create({ email: 'bar@foo.com' });
    mockToken = encode(mockUser);

    request(app)
      .get('/users/by_token')
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.FAILURE);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  it('should respond with user data', done => {
    request(app)
      .get('/users/by_token')
      .set('Authorization', `Bearer ${mockToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.OK);
        expect(JSON.stringify(res.body.user)).toBe(JSON.stringify(mockUser));
        done();
      });
  });
});
