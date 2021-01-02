import request from 'supertest';
import app from '../app';
import { User } from '../models';
import dropAllTables from '../utils/dropAllTables';

beforeAll(() => {
  return dropAllTables();
});

afterAll(() => {
  return dropAllTables();
});

describe('POST /login', () => {
  it('should have no users initially', async () => {
    const users = await User.findAll();
    expect(users).toHaveLength(0);
  });

  it('should create user when no user is found with email', done => {
    request(app)
      .post('/auth/login')
      .send({ email: 'foo@bar.com' })
      .expect(201)
      .end(async (err, res) => {
        if (err) return done();
        expect(res.body.token).toBeTruthy();
        const user = await User.findOne({
          where: {
            email: 'foo@bar.com',
          },
        });
        expect(user).toBeTruthy();
        expect(user!.email).toBe('foo@bar.com');
        done();
      });
  });

  it('should sign in user when user exists', done => {
    request(app)
      .post('/auth/login')
      .send({ email: 'foo@bar.com' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
