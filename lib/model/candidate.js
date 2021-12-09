'use strict';

const CandidateTable = (sequelize, datatypes) => {
  const model = sequelize.define(
    'candidate',
    {
      name: {
        type: datatypes.STRING,
        allowNull: false,
      },
      voteCount: {
        type: datatypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
  );

  return model;
};

module.exports = CandidateTable;
