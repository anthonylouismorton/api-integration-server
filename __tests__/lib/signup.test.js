const supertest = require('supertest');
const { app } = require('../../lib/server');
const { db } = require('../../lib/model');

const mockRequest = supertest(app);

beforeAll(async () => {
  await db.sync();
});

describe('Testing Signup route', () => {

  it('can create a user on /signup', async () => {

    let user = { username: 'testuser', password: 'string'};

    const response = await mockRequest.post('/signup').send(user);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(user.username);

  });

});

