module.exports = (sequelize, datatype) => {
  var User = sequelize.define('User', {
    first_name: datatype.STRING,
    last_name: datatype.STRING,
    nick_names: datatype.STRING,
    email: datatype.STRING,
    password: datatype.STRING,
    credits: datatype.INTEGER,
    image_id: datatype.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
