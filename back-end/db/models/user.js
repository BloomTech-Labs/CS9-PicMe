module.exports = (sequelize, datatype) => {
  var User = sequelize.define('User', {
    first_name: datatype.STRING,
    last_name: datatype.STRING,
    nick_names: datatype.STRING,
    email: datatype.STRING,
    password: datatype.STRING,
    credits: datatype.INTEGER,
    collection_image_id: datatype.INTEGER
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  // User.associate = function(models) {
  //   User.belongsToMany(models.Image, { through: 'user_collection_image', as: 'CollectionImage'});
  // };

  return User;
};
