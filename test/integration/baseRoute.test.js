const request = require('supertest'); // integration testing library for HTTP assertions
const app = require('../../src/app');

describe('test the / root path', () => {
  it('should successfully make a GET call', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
