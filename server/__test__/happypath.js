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
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0MzkwOTc4NCwiZXhwIjoxNjQzOTEzMzg0LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ImWoVAHlluOV2Mkg6GCPzN8wLN2ZmUf3yKYRKYci2h5jx78FYN-jDSQ27APkyDJfonsPDimxc3EDb6UKsl6-H66xAkKrGVTkS21m73M8gpi22HExEU1v9aHyBu2VQufeeB1WfP2Xb1Z5oXrquq5ehzZV4RrAT4O2QB2imwVSqzCekDSXL05nvw5wTOcKhEYceRGSifb-d72JEt2G4AJKWwgx5QxUrWr0h2fa1Fn1TYjDZhmfIH0f90yzZDrKyS4Jeu-zMJTiWJH1Odc1NkRCiEgPu5VkK9Nl8NhjRPxG_YPtUezikZXvr3AkoVYJcNKa7kOj6PwnsgpdZfglEhfH6Q';
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
});

describe('testing Entries API ', () => {
  //Entries CRUD
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzg5MDMzNiwiZXhwIjoxNjQzODkzOTM2LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.kM1YTdNlBBk3lGhu5Ws4Qte-5KndkrjM3GIA85SmXOKtgcf5MfyjyPlNqzF5HEj8rJeHR0lh2lh-pj1iA2ftATj7LAtyZcrEV80OaQF-XqrSxv-dRrRVF16S8Pfa3qfEZJFx1P1Pe_gypfKhuTHuSLvqXM1BmDiWKkv-UhDfCTHdvoDLC3xdqJuE7D0BV6bBI45WhKNwgkTsD4D1AecmmMzcWnn79-9WgrFJPWogWq-m0kmBWK_F5aA0TpyFBIzvN65KXhBr0NFCP4qE55i04d_pmehwZT8loqeUFSL1z6ZSZQsxxjS6HTP0X8UsVnMN97MTx06YkF0iyaSClUbgUg';

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
      book_id: '2',
      //does this check in the database for existence of these values?
    });
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
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('id'));
  });

  it('Should delete specific entry from database', async () => {
    // I implemente this with post or delete ?

    const res = await request(app).post('/entries/delete').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '2',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('Entry deleted'));
    //or the whole json. response ?
    //this applies to the others too
  });
});

// HAPPY PATH END

//Not sure if this works, I forgot to copy it

/* 
describe('testing Entries API ', () => {
  //Entries CRUD
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxMGM5MGJhNGMzNjYzNTE2ZTA3MDdkMGU5YTg5NDgxMDYyODUxNTgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmFiaWEgQWJiYXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeTBsdjk5Z1l1NFlYLXdwNlJialI5VEx4RWVXVUZNekRWWjZZeS09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGlicmFyeWFwcC1kNzdiNyIsImF1ZCI6ImxpYnJhcnlhcHAtZDc3YjciLCJhdXRoX3RpbWUiOjE2NDM3OTM0ODcsInVzZXJfaWQiOiJGYUFNb2hIRlR3ZnRGckFwSm5qY0V0NjQwazkyIiwic3ViIjoiRmFBTW9oSEZUd2Z0RnJBcEpuamNFdDY0MGs5MiIsImlhdCI6MTY0Mzg5MDMzNiwiZXhwIjoxNjQzODkzOTM2LCJlbWFpbCI6InJhYmlhYmJhczQ3MUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODQ1Nzc1NDg0MDQ5NTYxMjYxOCJdLCJlbWFpbCI6WyJyYWJpYWJiYXM0NzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.kM1YTdNlBBk3lGhu5Ws4Qte-5KndkrjM3GIA85SmXOKtgcf5MfyjyPlNqzF5HEj8rJeHR0lh2lh-pj1iA2ftATj7LAtyZcrEV80OaQF-XqrSxv-dRrRVF16S8Pfa3qfEZJFx1P1Pe_gypfKhuTHuSLvqXM1BmDiWKkv-UhDfCTHdvoDLC3xdqJuE7D0BV6bBI45WhKNwgkTsD4D1AecmmMzcWnn79-9WgrFJPWogWq-m0kmBWK_F5aA0TpyFBIzvN65KXhBr0NFCP4qE55i04d_pmehwZT8loqeUFSL1z6ZSZQsxxjS6HTP0X8UsVnMN97MTx06YkF0iyaSClUbgUg';

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
      list_id: '8',
      book_id: '2',
      //does this check in the database for existence of these values?
    });
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
    console.log(response.text);
    expect(response.text).toEqual(expect.stringContaining('id'));
  });

  it('Should delete specific entry from database', async () => {
    // I implemente this with post or delete ?

    const res = await request(app).post('/entries/delete').set('Authorization', `Bearer ${token}`).send({
      list_id: '1',
      book_id: '2',
      //does this check in the database for existence of these values?
    });
    expect(res.text).toEqual(expect.stringContaining('Entry deleted'));
    //or the whole json. response ?
    //this applies to the others too
  });
}); */
