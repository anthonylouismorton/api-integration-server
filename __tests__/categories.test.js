'use strict';

const supertest = require('supertest');
const { app } = require('../lib/server.js');
const request = supertest(app);
// connect to our test db
const { db } = require('../lib/model');


beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('Testing categories routes',()=>{
  it('Should be able to add category with post route ', async()=>{
    const body = {
      name: 'Food',
      description: 'yummy',
    };
    const response = await request.post('/categories').send(body);
    expect(response.body.displayName).toEqual('Food');
    expect(response.status).toEqual(201);
    expect(response.body.normalizedName).toEqual('food');
  });

  it('Should get all categories on get route', async() => {

    const response = await request.get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.results[0].displayName).toBe('Food');

  });
});
