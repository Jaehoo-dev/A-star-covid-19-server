import request from 'supertest';
import app from '../app';
import dropAllTables from '../utils/dropAllTables';
import { User, History } from '../models';
import { encode } from '../utils/jwt';
import { RESPONSE_RESULT } from '../constants';

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbUBtYWlsLmNvbSJ9.kjcKCtWwUwL60ajW4bb7uNhq8n5fOBRkOUiTpp_cui4';

beforeAll(() => {
  return dropAllTables();
});

afterAll(() => {
  return dropAllTables();
});

describe('POST /histories/new', () => {
  it('should decline when token is invalid', done => {
    request(app)
      .post('/histories/new')
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.FAILURE);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  const mockCoordinates = {
    startingPoint: 0,
    destination: 100,
  };
  let mockToken: string;

  it('should create new history when incoming coordinates do not exist in histories', async done => {
    const mockUser = await User.create({ email: 'baz@bar.com' });
    mockToken = encode(mockUser);

    request(app)
      .post('/histories/new')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(mockCoordinates)
      .expect(201)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.OK);

        const histories = await mockUser.getHistories();
        expect(histories).toHaveLength(1);
        done();
      });
  });

  it('should not create but update updatedAt when history with incoming coordinates exist', async done => {
    const oldHistory = await History.findOne({
      where: {
        userEmail: 'baz@bar.com',
        coordinates: [mockCoordinates.startingPoint, mockCoordinates.destination],
      },
    });

    request(app)
      .post('/histories/new')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(mockCoordinates)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.OK);

        const updatedHistory = await History.findOne({
          where: {
            userEmail: 'baz@bar.com',
            coordinates: [mockCoordinates.startingPoint, mockCoordinates.destination],
          },
        });
        expect(updatedHistory!.updatedAt.getTime()).toBeGreaterThan(oldHistory!.updatedAt.getTime());
        done();
      });
  });

  it('should store only up to ten histories', async done => {
    const user = await User.findByPk('baz@bar.com');

    for (let i = 0; i < 10; i++) {
      await user!.createHistory({
        coordinates: [i, i + 1],
      });
    }

    request(app)
      .post('/histories/new')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({
        startingPoint: 200,
        destination: 400,
      })
      .end(async (err, res) => {
        if (err) return done(err);
        const histories = await user!.getHistories();
        expect(histories).toHaveLength(10);
        done();
      });
  });
});

describe('GET /histories', () => {
  it('should decline when token is invalid', done => {
    request(app)
      .get('/histories')
      .set('Authorization', `Bearer ${fakeToken}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.FAILURE);
        expect(res.body.message).toBe('User not found');
        done();
      });
  });

  it('should respond when token is valid', async done => {
    const mockUser = await User.create({ email: 'bar@baz.com' });
    const mockToken = encode(mockUser);

    request(app)
      .get('/histories')
      .set('Authorization', `Bearer ${mockToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.result).toBe(RESPONSE_RESULT.OK);
        expect(res.body.histories).toBeTruthy();
        done();
      });
  });
});
