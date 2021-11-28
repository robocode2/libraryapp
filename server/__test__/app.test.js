const request = require('supertest');
const app = require('../../app');

describe('get /books/id', () => {
  describe('get specific book  through id', () => {
    test('should specify json as the content type in the http header', async () => {
      const response = await request(app).get('/books/1').send({
        id: '1',
      });
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});
