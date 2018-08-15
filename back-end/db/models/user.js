const bcrypt = require('bcrypt');

module.exports = (sequelize, datatype) => {
  var User = sequelize.define('User', {
    first_name: datatype.STRING,
    last_name: datatype.STRING,
    nick_names: datatype.STRING,
    email: datatype.STRING,
    password: datatype.STRING,
    credits: datatype.INTEGER,
    image_id: datatype.INTEGER
  }, {
//    freezeTableName: true,
//    indexes: [{unique: true, fields: ['email']}],
    instanceMethods: {
      authenticate: function (value) {
        if (bcrypt.compareSync(value, this.password))
          return this;
        else
          return false;
      }
    },
    hooks: {
      beforeCreate: function(user, options) {
        return new Promise((resolve, reject) => {
          bcrypt.hash(user.password, 8, (err, data) => {
            if (err) reject(err);
            user.password = data;
            resolve();
          })
        });
      }
    }});
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
