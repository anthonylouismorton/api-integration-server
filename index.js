require('dotenv').config();
const app = require('./lib/server');
const { db } = require('./lib/model');
const PORT = process.env.PORT || 3005;

db.sync().then(() => {
  app.start(PORT);
});
