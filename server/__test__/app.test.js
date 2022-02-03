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

// SAD PATH

/* describe('testing Book methods error handling and model validations', () => {
  //Book CRUD

  it('Should expect error message : title between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: '', //is actually empty should return empty error
      isbn: '1234567891012',
      description: 'Test - Title',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter a title between 1 and 250 charcters'));
  });

  it('Should expect error message : isbn between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Test - ISBN', //is actually empty
      isbn: '123',
      description: 'Test - ISBN',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter isbn 13 charcters'));
  });

  it('Should expect error message : isbn between 100 and 150', async () => {
    const res = await request(app).post('/books/create').send({
      title: 'Test - Description', //is actually empty
      isbn: '1234567891012',
      description: 'Test - Description',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter book description'));
  });

  it('Should fail to get non-existing book, return message', async () => {
    const response = await request(app).get('/books/1'); //grab database error message instead?
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('This book does not exist'));
  });


  // update unexistent book with wrong paramters


  // this is all unimplemented in the front end so I won't implement it here

}); */

describe('testing List model validations', () => {
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0MzkxMzgyMCwiZXhwIjoxNjQzOTE3NDIwLCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.HuuOsSmUs-e8N8S2IkDQRhOkKBKCtUqhgIVnC-0pZoC0vXNmqKzqM3eV3-bHxFkeWOzy9Qfbkb3ZuSBILecBNkbEUQI9zUfYIf5I4yuSoLowCoYebUUbQ9u3smlW_TpEMzAIPsyGL2_1VqiWmxCcnQDkJ42P5X-8AL5IKphKTyfyGQnnc7YY8Z4MRXlhJuVPjH-htRRPsSxKurrRp9CPqxcXiqY3wI7-H4GrHvcEFaY0tPTSCO1JkBZECk9Jo7gIjNZ0TJbGfkQ3fE5DCMp9VFSdDwMcQ5lmYD1jmGsdt8g5txxVVCMSnLkKu4s5wBPhiolMTmvkTyz2g3FPrb9d2g';

  it('Should return error message for list description', async () => {
    const res = await request(app).post('/lists/create').set('Authorization', `Bearer ${token}`).send({
      name: '', // test failing -> Throw newError( , )
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
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('This list does not exist'));
  });
});

describe('testing Entry creation error handling and validations', () => {
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0MzkxMzgyMCwiZXhwIjoxNjQzOTE3NDIwLCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.HuuOsSmUs-e8N8S2IkDQRhOkKBKCtUqhgIVnC-0pZoC0vXNmqKzqM3eV3-bHxFkeWOzy9Qfbkb3ZuSBILecBNkbEUQI9zUfYIf5I4yuSoLowCoYebUUbQ9u3smlW_TpEMzAIPsyGL2_1VqiWmxCcnQDkJ42P5X-8AL5IKphKTyfyGQnnc7YY8Z4MRXlhJuVPjH-htRRPsSxKurrRp9CPqxcXiqY3wI7-H4GrHvcEFaY0tPTSCO1JkBZECk9Jo7gIjNZ0TJbGfkQ3fE5DCMp9VFSdDwMcQ5lmYD1jmGsdt8g5txxVVCMSnLkKu4s5wBPhiolMTmvkTyz2g3FPrb9d2g';

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
      name: 'Test list', // test failing -> Throw newError( , )
      description: 'Test list description',
    });
    expect(res.text).toEqual(expect.stringContaining('Please enter a list name between 1 and 100 charcters'));
  });

  // I haven't tested happy path for entries yet

  it('Adding INVALID BOOK TO LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '2',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('ListId')); //what response now ?
    //or the whole json. response ?
    //this applies to the others too
  });

  test(' Adding BOOK TO INVALID LIST', async () => {});

  test(' Adding  invalid BOOK TO invalid LIST', async () => {});
});
