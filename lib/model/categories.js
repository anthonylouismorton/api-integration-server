'use strict';

const CategoriesTable = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'category',
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      normalizedName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
  );
  return model;
};

module.exports = CategoriesTable;
