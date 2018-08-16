'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_collection_image = sequelize.define('user_collection_image', {
    user_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {});
  user_collection_image.associate = function(models) {
    // associations can be defined here
  };
  return user_collection_image;
};