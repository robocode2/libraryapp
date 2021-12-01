const request = require('supertest');
const app = require('../../app');
//import * as faker from "faker"
//import supertest from "supertest"

//const { app } = require("../../app")
//import db from '../config/database/models/index';
const db = require('../config/database/models/index');

//import { Authentication } from "../../services/Authentication"

describe('Testing get books', () => {
  let thisDb = db;

  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });
  /* 
  it('should add new book', async () => {
    const res = await request(app).post('/books').send({
      id: '1',
      title: 'Jane Eyre',
      isbn: '1231421251212',
      description: 'my favourite book',
    });
    expect(res.status).toBe(201);
  }); */

  /* describe('get specific book  through id', () => {
    test('add new book', async () => {
      const res = await request(app).get('/books').send({
        id: '1',
        title: 'Jane Eyre',
        isbn: '1231421251212',
        description: 'my favourite book',
      });
      expect(res.status).toBe(201);
    });
  });
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
}); */

  describe('get /books/id', () => {
    describe('get specific book  through id', () => {
      test('should specify json as the content type in the http header', async () => {
        const response = await request(app).get('/books/1').send({
          id: '1',
        });
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
    });
    afterAll(async () => {
      await thisDb.sequelize.close();
    });
  });
  /* 
describe('test the JWT authorization middleware', () => {
  // Set the db object to a variable which can be accessed throughout the whole test file
  let thisDb= db;

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true });
  });

  it('should succeed when accessing an authed route with a valid JWT', async () => {
    const authentication = new Authentication();
    const randomString = faker.random.alphaNumeric(10);
    const email = `user-${randomString}@email.com`;
    const password = `password`;

    await authentication.createUser({ email, password });

    const { authToken } = await authentication.loginUser({
      email,
      password,
    });

    // App is used with supertest to simulate server request
    const response = await supertest(app)
      .post('/v1/auth/protected')
      .expect(200)
      .set('authorization', `bearer ${authToken}`);

    expect(response.body).toMatchObject({
      success: true,
    });
  });

  it('should fail when accessing an authed route with an invalid JWT', async () => {
    const invalidJwt = 'OhMyToken';

    const response = await supertest(app)
      .post('/v1/auth/protected')
      .expect(400)
      .set('authorization', `bearer ${invalidJwt}`);

    expect(response.body).toMatchObject({
      success: false,
      message: 'Invalid token.',
    });
  });

  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await thisDb.sequelize.close();
  });
}); */
});
