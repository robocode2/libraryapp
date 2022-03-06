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

describe('testing List model validations', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it('Should return error message for list description', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: '',
      description: 'Test list name',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter a list name between 1 and 100 charcters'));
  });

  it('Should return error message for list description', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: 'Test description',
      description: '',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter a list description between 1 and 100 charcters'));
  });

  it('Fail to get list, return error message', async () => {
    const response = await request(app).get('/lists/1').set('Authorization', `Bearer ${token}`);
    expect(response.text).toEqual(expect.stringContaining('This list does not exist'));
  });
});

describe('testing ListAPI with Authorisation ', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  it('Should add new User through (list/create) - Authorized ', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: 'Test',
      description: 'Adding new list test',
    });
    expect(res.text).toEqual(expect.stringContaining('Adding new list test'));
  });

  it('Add new List with - Authorized ', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: 'Test 2',
      description: 'My Favourites 2',
    });
    expect(res.text).toEqual(expect.stringContaining('My Favourites 2'));
  });

  test('GET specific list from database', async () => {
    const response = await request(app).get('/lists/2').set('Authorization', `Bearer ${token}`);
    expect(response.text).toEqual(expect.stringContaining('My Favourites 2'));
  });

  test('User geting all their lists', async () => {
    const response = await request(app).get('/lists').set('Authorization', `Bearer ${token}`);
    expect(response.text).toEqual(expect.stringContaining('Test'));
  });
});
