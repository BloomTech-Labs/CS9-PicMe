'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    user_one_id: DataTypes.INTEGER,
    user_two_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    action_user_id: DataTypes.INTEGER
  }, {});

  Relationship.associate = function(models) {
    // associations can be defined here
  };

  return Relationship;
};


