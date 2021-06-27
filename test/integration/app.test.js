const axios = require('axios');
const mongoose = require('mongoose');
const request = require('supertest'); // integration testing library for HTTP assertions
const app = require('../../src/app');
const ProductModel = require('../../src/models/product');

jest.mock('axios');

beforeEach(async () => {
  await mongoose.connect('mongodb://localhost/myretail-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('test the / root path', () => {
  it('should successfully make a GET call', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('test the /products/:id endpoint', () => {
  it('should successfully make a GET call', async () => {
    await ProductModel.create({ id: '12351365', current_price: { value: 12.50, currency_code: 'USD' } });
    axios.get.mockResolvedValueOnce({
      data: {
        product: {
          item: {
            tcin: '12351365',
            product_description: {
              title: 'some item'
            }
          }
        }
      }
    });
    const response = await request(app).get('/products/12351365');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: '12351365',
      name: 'some item',
      current_price: {
        value: 12.50,
        currency_code: 'USD'
      }
    });
  });

  it('should successfully make a PUT call', async () => {
    await ProductModel.create({ id: '12351365', current_price: { value: 12.50, currency_code: 'USD' } });
    const response = await request(app).put('/products/12351365').send({ current_price: { value: 16.30, currency_code: 'USD' } });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ current_price: { currency_code: 'USD', value: 16.3 }, id: '12351365' });
  });
});
