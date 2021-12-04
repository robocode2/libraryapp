const request = require('supertest');
const app = require('../../app');
const book = require('../config/database/models/book');
//import * as faker from "faker"
//import supertest from "supertest"
const middleware = require('./server/middleware/index');
//const { app } = require("../../app")
//import db from '../config/database/models/index';
const db = require('../config/database/models/index');

//import { Authentication } from "../../services/Authentication"

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

describe('test the JWT authorization middleware', () => {
  //eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWUgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKdzA5TmdjMm9OTFM0dHZjbjlreGIxbW9fX1V5eUlHRlpKQkFGQnE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2Mzg2NDk1NjEsInVzZXJfaWQiOiJhQlhDWHZEOXNVUlFaQUl3MlZibkpxTDBZVEgyIiwic3ViIjoiYUJYQ1h2RDlzVVJRWkFJdzJWYm5KcUwwWVRIMiIsImlhdCI6MTYzODY0OTU2MSwiZXhwIjoxNjM4NjUzMTYxLCJlbWFpbCI6InJhYmllLmFiYmFzQGNvZGUuYmVybGluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDEzMzAwMzE0MTExMTUxNjIwMTYiXSwiZW1haWwiOlsicmFiaWUuYWJiYXNAY29kZS5iZXJsaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.VBM8eK8YLxNz6dYXqStLMwT-1cSNwjqNgjo0v7_h-l5GVNWHKFpP7kxTSC8xWlNwTV-67CQpAeImUAEWgRTT9DAxkGKQWx3oqsJxlkJ0dV_qMcvrbpCFJBlFYQma7i6aYpT96A9h2bUDe3jA0a3m4uKNQ7wmr74KwLdp3jwnBcyrH-GJC_2KOk98gG6FQfEbeYvGgm8-ySix87JKwIQRgLUjFT-0BRfXULh50Nr6qcuLsoW7ijGPaGa2Itc99BtTDO7yjcFweZjS3jUJgbJL3eFU7G4X_s3C-rmn-BK6HupW1vwYXY9zj5PrG6nAbn9mnH-OimYCUWBaREitOjNGRw
});

describe('testing bookAPI ', () => {
  //CRUD erledigt
  test('ADD new book', async () => {
    const res = await request(app).post('/books').send({
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

afterAll(async () => {
  await db.sequelize.close();
});
