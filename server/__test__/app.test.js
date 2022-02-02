const request = require('supertest');
const app = require('../../app');
const book = require('../config/database/models/book');
//import * as faker from "faker"
//import supertest from "supertest"
//const middleware = require('../server/middleware/index');
//const { app } = require("../../app")
//import db from '../config/database/models/index';
const db = require('../config/database/models/index');
const { list_entries } = require('../controllers/entriesController');

//import { Authentication } from "../../services/Authentication"

/* describe('test the JWT authorization middleware', () => {
  //eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWUgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKdzA5TmdjMm9OTFM0dHZjbjlreGIxbW9fX1V5eUlHRlpKQkFGQnE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2Mzg2NDk1NjEsInVzZXJfaWQiOiJhQlhDWHZEOXNVUlFaQUl3MlZibkpxTDBZVEgyIiwic3ViIjoiYUJYQ1h2RDlzVVJRWkFJdzJWYm5KcUwwWVRIMiIsImlhdCI6MTYzODY0OTU2MSwiZXhwIjoxNjM4NjUzMTYxLCJlbWFpbCI6InJhYmllLmFiYmFzQGNvZGUuYmVybGluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDEzMzAwMzE0MTExMTUxNjIwMTYiXSwiZW1haWwiOlsicmFiaWUuYWJiYXNAY29kZS5iZXJsaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.VBM8eK8YLxNz6dYXqStLMwT-1cSNwjqNgjo0v7_h-l5GVNWHKFpP7kxTSC8xWlNwTV-67CQpAeImUAEWgRTT9DAxkGKQWx3oqsJxlkJ0dV_qMcvrbpCFJBlFYQma7i6aYpT96A9h2bUDe3jA0a3m4uKNQ7wmr74KwLdp3jwnBcyrH-GJC_2KOk98gG6FQfEbeYvGgm8-ySix87JKwIQRgLUjFT-0BRfXULh50Nr6qcuLsoW7ijGPaGa2Itc99BtTDO7yjcFweZjS3jUJgbJL3eFU7G4X_s3C-rmn-BK6HupW1vwYXY9zj5PrG6nAbn9mnH-OimYCUWBaREitOjNGRw
}); */
beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('testing bookAPI ', () => {
  //Book CRUD

  test('ADD new book', async () => {
    const res = await request(app).post('/books/create').send({
      id: '1',
      title: 'Jane Eyre',
      isbn: '1231421251212',
      description: 'my favourite book',
    });
    expect(res.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  test('GET specific book from database', async () => {
    const response = await request(app).get('/books/1');
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('Jane Eyre'));
  });

  test('UPDATE book', async () => {
    const res = await request(app).put('/books/1').send({
      id: '1',
      title: 'Jane Eyre',
      isbn: 'blablabla',
      description: 'my favourite book',
    });
    expect(res.text).toEqual(expect.stringContaining('blablabla'));
  });

  test('DELETE specific book', async () => {
    const response = await request(app).delete('/books/1');
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('Book deleted'));
  });
});

describe('testing ListAPI with Authorisation ', () => {
  //List CRUD
  const token =
    '1eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzg0MzUyNiwiZXhwIjoxNjQzODQ3MTI2LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.V5HmetWffIn3nJGPR9GZlTyvs2GzwWk8GNBqg7uI9Pcq4N_5e6r5ohprynf3q3zQ3j7F-0LdYI9z14PpFGRS2zI6s5e3t3hk_NrgkPNWt3TWtveCM0I-fgABrj0szVOD9SDzlPPThFdgapd2qarak21_0BGc7vbSoO_phFRuLpMQ_WcPfgm5btz9DKTuds29dncZ4W5rSYa6LvZ8y2wq8SAAI0VUy2JKproc3uveVNBtmpQCVFaOSpI_1RpawxDsuc2ii5ZD-zCgm1O1x04EfJrczKZDA9M9oKXXtXvb82B_LQNGRCwSbB-hj6WFrlU4ZJ8JGitHJJSj9FyhDybClg';

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
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('My Favourites 2'));
  });

  test('User geting all their lists', async () => {
    const response = await request(app).get('/lists').set('Authorization', `Bearer ${token}`);
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('Test'));
  });
});

describe('testing ListAPI without Authorisation ', () => {
  test('Add new list without authentication', async () => {
    const res = await request(app).post('/lists/create').send({
      name: 'Test',
      description: 'Adding new list test',
    });
    expect(res.text).toEqual(expect.stringContaining('You must be logged in!'));
  });

  //should i write two more for the non-authorised case ?
});
/* 
describe('testing Entries API ', () => {
  //Entries CRUD

  it('Should add new book entry into list ', async () => {
    const res = await request(app).post('/entries/create').send({
      list_id: '3',
      book_id: '3',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('Entry created?'));
    //or the whole json. response ?
    //this applies to the others too
  });

  it('Should delete specific entry from database', async () => {
    // I implemente this with post or delete ?

    const res = await request(app).post('/entries/delete').send({
      list_id: '3',
      book_id: '3',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('Entry deleted'));
    //or the whole json. response ?
    //this applies to the others too
  });

  it('Should get all entries in a list', async () => {
    const response = await request(app).get('/entries/3');
    // add before() {
    //add multiple list_entries
    //check them
    //}
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('Test'));
  });
});
 */
/*   test('UPDATE book', async () => {
    const res = await request(app).put('/lists/1').send({
      id: '1',
      title: 'Jane Eyre',
      isbn: 'blablabla',
      description: 'my favourite book',
    });
    expect(res.text).toEqual(expect.stringContaining('blablabla'));
  });
 */
/*  test('DELETE specific book', async () => {
    const response = await request(app).delete('/books/1');
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('Book deleted'));
  }); */
