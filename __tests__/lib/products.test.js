'use strict';

const supertest = require('supertest');
const { app } = require('../../lib/server.js');
const request = supertest(app);
// connect to our test db
const { db, Categories } = require('../../lib/model');

let testCat = null;

beforeAll(async () => {
  await db.sync();
  testCat = await Categories.create({
    displayName: 'Test',
    normalizedName: 'test',
    description: 'words words',
  });
});

describe('Testing the products router', () => {

  it('should create a product', async () => {
    let product = {
      name: 'Test Product',
      categoryId: testCat.id,
      count: 0,
      price: 100,
    };

    let response = await request.post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Product');
    expect(response.body.categoryId).toEqual(testCat.id);
  });

  it('Should fetch all products', async () => {
    let response = await request.get('/products');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
    expect(response.body.results[0].name).toEqual('Test Product');
  });
});
