'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'must be valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING
    }
  }, {});
};
