'use strict';

const supertest = require('supertest');
const {  app } = require('../../lib/server');
const { db, Candidates } = require('../../lib/model');
const mockRequest = supertest(app);

beforeAll(async () => {
  await db.sync();
});

describe('Testing the Vote feature', () => {

  it('should add a increment a vote for a candidate', async () => {
    const candidate = await Candidates.create({ name: 'test' });

    let response = await mockRequest.post('/vote').send({ id: candidate.id });

    expect(response.status).toBe(200);
  });
});

