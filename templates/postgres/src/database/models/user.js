'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt: {type: DataTypes.DATE, field: 'updated_at'},
  }, {
    timestamps: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

