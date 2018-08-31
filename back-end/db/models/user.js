const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const db = require('../dbconnection');
const Relationship = require('./relationship')(db, Sequelize);

const encrypt = (user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 8, (err, data) => {
      if (err) reject(err);
      user.password = data;
      resolve();
    })
  });
}

module.exports = (sequelize, datatype) => {
  var User = sequelize.define('User', {
      first_name: datatype.STRING,
      last_name: datatype.STRING,
      nick_names: datatype.STRING,
      email: datatype.STRING,
      password: datatype.STRING,
      credits: datatype.INTEGER,
      hashed_id: datatype.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email']
        }
      ],
      getterMethods: {
        fullName() {
          return this.first_name + ' ' + this.last_name;
        }
      }
    }
  );

  User.beforeCreate(encrypt);

  User.prototype.authenticate = function (value) {
    if (bcrypt.compareSync(value, this.password))
      return this;
    else
      return false;
  }

  User.prototype.friendRequest = async function(requestee) {
    await Relationship.create({
      user_one_id: this.id,
      user_two_id: requestee.id,
      status: 'pending',
      action_user_id: this.id
    });
  }

  User.prototype.acceptFriendRequest = function(requestee) {

  }

  return User;
};
