const request = require('supertest'); // integration testing library for HTTP assertions
const app = require('../../src/app');

describe('test the / root path', () => {
  it('should successfully make a GET call', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('test the /products/:id endpoint', () => {
  it('should successfully make a GET call', async () => {
    const response = await request(app).get('/products/12351365');
    expect(response.statusCode).toBe(200);
  });

  it('should successfully make a PUT call', async () => {
    const response = await request(app).put('/products/12351365');
    expect(response.statusCode).toBe(200);
  });
});
