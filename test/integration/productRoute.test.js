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
  jest.resetAllMocks();
});

describe('test the /products/:id endpoint', () => {
  describe('test the GET method', () => {
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

    it('should return 404 statusCode if no productId included in request path', async () => {
      axios.get.mockResolvedValueOnce({});
      const response = await request(app).get('/products/');
      expect(response.statusCode).toBe(404);
    });

    it('should return 404 statusCode if no data exists for productId', async () => {
      axios.get.mockResolvedValueOnce({});
      const response = await request(app).get('/products/31613611');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Product data for ID 31613611 not found');
    });

    it('should return 500 statusCode if error thrown', async () => {
      axios.get.mockRejectedValueOnce();
      const response = await request(app).get('/products/31613611');
      expect(response.statusCode).toBe(500);
      expect(response.text).toBe('Internal Server Error');
    });
  });

  describe('test the PUT method', () => {
    it('should successfully make a PUT call', async () => {
      await ProductModel.create({ id: '12351365', current_price: { value: 12.50, currency_code: 'USD' } });
      const response = await request(app).put('/products/12351365').send({ current_price: { value: 16.30, currency_code: 'USD' } });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ current_price: { currency_code: 'USD', value: 16.3 }, id: '12351365' });
    });

    it('should return 404 statusCode if no productId in params', async () => {
      const response = await request(app).put('/products').send({ current_price: { value: 16.30, currency_code: 'USD' } });
      expect(response.statusCode).toBe(404);
    });

    it('should return 500 statusCode if error thrown', async () => {
      jest.spyOn(ProductModel, 'findOneAndUpdate').mockRejectedValueOnce();
      const response = await request(app).put('/products/12351365').send({ current_price: { value: 16.30, currency_code: 'USD' } });
      expect(response.statusCode).toBe(500);
    });
  });
});
