const request = require('supertest');
const app = require('../../app');
const db = require('../database/models/index');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('testing bookAPI ', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test('ADD new book', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Jane Eyre',
      isbn: '1231421251212',
      description: 'my favourite book',
    });
    expect(res.status).toBe(201);
    expect(res.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  test('GET specific book from database', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(200);
    expect(res.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  test('UPDATE book', async () => {
    const res = await request(app).put('/books/1').send({
      title: 'Jane Eyre',
      isbn: '9321123456782',
      description: 'my favourite book',
    });
    expect(res.status).toBe(200);
    expect(res.text).toEqual(expect.stringContaining('9321123456782'));
  });

  test('DELETE specific book', async () => {
    const res = await request(app).delete('/books/1');
    expect(res.status).toBe(200);
    expect(res.text).toEqual(expect.stringContaining('Book deleted'));
  });
});

describe('testing Book methods error handling and model validations', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it('Should expect error message : title between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: '',
      isbn: '1234567891012',
      description: 'Test - Title',
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual(expect.stringContaining('Please enter a title between 1 and 250 charcters'));
  });

  it('Should expect error message : isbn between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Test - ISBN',
      isbn: '123',
      description: 'Test - ISBN',
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual(expect.stringContaining('Please enter isbn 13 charcters'));
  });

  it('Should expect error message : isbn between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Test - Description',
      isbn: '1234567891012',
      description: '',
    });
    expect(res.status).toBe(400);
    expect(res.text).toEqual(expect.stringContaining('Please enter book description'));
  });

  it('Should fail to get non-existing book, return message', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toBe(500);
    expect(res.text).toEqual(expect.stringContaining('This book does not exist'));
  });
});
