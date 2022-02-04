const request = require('supertest');
const app = require('../../app');
const db = require('../config/database/models/index');

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

  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzk1NzQyOCwiZXhwIjoxNjQzOTYxMDI4LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.lZoEHE6o8d48-1Yk-B_YINpKa4qrEgXHvqUpn_OuFDENq7PL6vxVy6HWBz2kRyv6HQ_MAPp_mXn58ww8grqZKfp5iH6HG75PpAECIaAbkzPT7cmP5TyQkqtX65Q6vYa7Cqp2xNBNhUXuIppHU5pItG9kpPYjB5U7Kn3a900RhcqgJHVenKwakjDPQDqAeiedfX-qh-8TPicClpPg5u8VfotIJDSEM8bwj16IYJj069ryfzv3ikF9JD4R4p949IrwkQHIKuIgaEHLKAGXt3ZW1kvsjlauAGKKNKAlOqVMxk7X6-WUOhsoJedOzfkimGaMTb_sD-sLvu7JRuK6uYd0eQ';
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
    //expect(res.status).toBe(200);
    //expect(res.status).toBe(200);
    //expect(res.status).toBe(200);
    //expect(res.status).toBe(200);
    //expect(res.status).toBe(200);
    //expect(res.status).toBe(200);

    //  .expect("Content-Type", /json/)
    // .expect({ name: "frodo" })
    // .expect(200, done);
  });

  // I haven't tested happy path for entries yet

  it('Adding INVALID BOOK TO LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '2',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (BookId)=(2) is not present in table')); //what response now ?
    //or the whole json. response ?
    //this applies to the others too
  });

  it('Adding BOOK TO INVALID LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '2',
      book_id: '1',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (ListId)=(2) is not present in table')); //what response now ?
    //or the whole json. response ?
    //this applies to the others too
  });

  it('Adding INVLID BOOK TO INVALID LIST', async () => {
    const res = await request(app).post('/entries/create').set('Authorization', `Bearer ${token}`).send({
      list_id: '3',
      book_id: '3',
    });
    expect(res.text).toEqual(expect.stringContaining('Key (ListId)=(3) is not present in table')); //what response now ?
    //or the whole json. response ?
    //this applies to the others too
  });
});

describe('testing Entries API ', () => {
  //Entries CRUD
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzk1NzQyOCwiZXhwIjoxNjQzOTYxMDI4LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.lZoEHE6o8d48-1Yk-B_YINpKa4qrEgXHvqUpn_OuFDENq7PL6vxVy6HWBz2kRyv6HQ_MAPp_mXn58ww8grqZKfp5iH6HG75PpAECIaAbkzPT7cmP5TyQkqtX65Q6vYa7Cqp2xNBNhUXuIppHU5pItG9kpPYjB5U7Kn3a900RhcqgJHVenKwakjDPQDqAeiedfX-qh-8TPicClpPg5u8VfotIJDSEM8bwj16IYJj069ryfzv3ikF9JD4R4p949IrwkQHIKuIgaEHLKAGXt3ZW1kvsjlauAGKKNKAlOqVMxk7X6-WUOhsoJedOzfkimGaMTb_sD-sLvu7JRuK6uYd0eQ';
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
      //does this check in the database for existence of these values?
    });
    console.log(res.text);
    expect(res.text).toEqual(expect.stringContaining('ListId'));
    //or the whole json. response ?
    //this applies to the others too
  });

  it('Should get all entries in a list', async () => {
    const response = await request(app).get('/entries/1').set('Authorization', `Bearer ${token}`);
    // add before() {
    //add multiple list_entries
    //check them
    //}
    console.log(response);
    expect(response.text).toEqual(expect.stringContaining('id'));
  });

  it('Should delete specific entry from database', async () => {
    // I implemente this with post or delete ?

    const res = await request(app).post('/entries/delete').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '1',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('Entry deleted'));
    //or the whole json. response ?
    //this applies to the others too
  });
});
