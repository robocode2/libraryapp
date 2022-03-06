const request = require('supertest');
const app = require('../../app');
const db = require('../database/models/index');

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM5ODI3MzYsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzk4MjczNiwiZXhwIjoxNjQzOTg2MzM2LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ZJ7HRQrcdXFJ5tJ6VvqptN3492wBepaOz_H1zv2yepKO1fMaEAv3q_Kpqz8VknEdkOC_AhJK5BiGyvVwY2euDZKvq9OdQi2Worc-CkBMMlkOyEjyc_NN7yuM3qWXguFRO4SqZkAf2zz1D0sN1QgVk2wsDb4S2Tbwkykaru3131bTNinWgrYppE5bHmRUitn1SYnZYMSVErW-hPQhxe_f91o6uxBvEGQR6g51u6aKU3XO5R1wzGgEXiac72chsbv5EsN2DYl5VmArQqP3kSgAo-nm1wjExrsqlOyU0qZ2hq5NzbNsLzF-iOycecv-BwH_xXTtJNlqjTG6WwdQVBSuXA';
beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('testing Entry creation error handling and validations', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test('Add new book successfully', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Jane Eyre',
      isbn: '1231421251212',
      description: 'my favourite book',
    });
    expect(res.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  it('Add new list successfully', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: 'Test list',
      description: 'Test list description',
    });
    expect(res.text).toEqual(expect.stringContaining('Test list'));
    expect(res.status).toBe(201);
  });

  it('Adding INVALID BOOK TO LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '2',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (BookId)=(2) is not present in table')); //what response now ?
  });

  it('Adding BOOK TO INVALID LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '2',
      book_id: '1',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (ListId)=(2) is not present in table')); //what response now ?
  });

  it('Adding INVLID BOOK TO INVALID LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '3',
      book_id: '3',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (ListId)=(3) is not present in table'));
  });
});

describe('testing Entries API ', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test('ADD new book', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Jane Eyre',
      isbn: '1231421251212',
      description: 'my favourite book',
    });
    expect(res.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  it('Should add new User through (list/create) - Authorized ', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: 'Test',
      description: 'Adding new list test',
    });
    expect(res.text).toEqual(expect.stringContaining('Adding new list test'));
  });

  it('Should add new book entry into list ', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '1',
    });
    expect(res.text).toEqual(expect.stringContaining('ListId'));
  });

  it('Should get all entries in a list', async () => {
    const response = await request(app).get('/entries/1').set('Authorization', `Bearer ${token}`);
    expect(response.text).toEqual(expect.stringContaining('id'));
  });

  it('Should delete specific entry from database', async () => {
    const res = await request(app).post('/entries/delete').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '1',
    });
    expect(res.text).toEqual(expect.stringContaining('Entry deleted'));
  });
});
