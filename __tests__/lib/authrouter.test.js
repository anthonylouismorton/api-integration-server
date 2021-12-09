'use strict';

process.env.SECRET = 'secret';

const { db, Users } = require('../../lib/model');
const bearerAuth = require('../../lib/middleware/bearer.js');

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(async () => {
  await db.sync();
});

describe('Auth Router', () => {

  it('can add an item to the DB if user has create permissions', async () => {
    const user = await Users.create(users['admin']);
    // test bearerAuth
    let req = {
      headers: {
        authorization: `Bearer: ${user.token}`,
      },
    };
    let res = {
      status: () => {
        return {
          send: () => jest.fn(),
        };
      },
    };

    let next = jest.fn();
    await bearerAuth(req, res, next);

    expect(next).toHaveBeenCalled();

  });
});
