'use strict';

const { db } = require('../../lib/model');

module.exports = () => db.drop();
