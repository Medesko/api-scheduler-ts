import {} from 'jest';
import * as supertest from 'supertest';
const request = supertest('http://localhost:9000');

describe('GET /categories', () => {
  it('should return 200 OK', () => {
    request
      .get('/categories')
      .expect(200);
  });
});
