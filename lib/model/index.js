'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const UserTable = require('./user.js');
const CandidateTable = require('./candidate.js');
const ProductTable = require('./products');
const CategoriesTable = require('./categories');
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';
const sequelizeConfig = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeConfig);
const Users = UserTable(sequelize, DataTypes);
const Candidates = CandidateTable(sequelize, DataTypes);
const Products = ProductTable(sequelize, DataTypes);
const Categories = CategoriesTable(sequelize, DataTypes);
module.exports = {
  db: sequelize,
  Users,
  Candidates,
  Products,
  Categories,
};
