const request = require('supertest');
const app = require('../src/app');

describe('test the application root path', () => {
  it('should successfully make a GET call', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
