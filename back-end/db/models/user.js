const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../dbconnection');
const Relationship = require('./relationship')(db, Sequelize);
const Image = require('./image')(db, Sequelize);

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
      requester_id: this.id,
      requestee_id: requestee.id,
      status: 'pending',
      action_user_id: this.id
    });
  }

  User.prototype.acceptFriendRequest = async function(requestee) {
    await Relationship.update({
        status: 'accepted',
      }, {
        where: { requestee_id: this.id, requester_id: requestee.id }
      }
    )};

  User.prototype.declineFriendRequest = async function(requestee) {
    const relationship = await Relationship.findOne({ where: { 
        requestee_id: this.id, requester_id: requestee.id }
      });

    await relationship.destroy();
  };

  User.prototype.isFriendsWith = async function(user) {
    return Boolean(await Relationship.findOne({ where: { 
      [Op.or]: [
        { [Op.and]: { requestee_id: this.id, requester_id: user.id } },
        { [Op.and]: { requestee_id: user.id, requester_id: this.id } },
      ],
      [Op.and]: { status: 'accepted'}
    }}));
  }

  User.prototype.unFriend = async function(user) {
    const relationship = await Relationship.findOne({ where: { 
      [Op.or]: [
        { [Op.and]: { requestee_id: this.id, requester_id: user.id } },
        { [Op.and]: { requestee_id: user.id, requester_id: this.id } },
      ],
      [Op.and]: { status: 'accepted'}
    }});

    await relationship.destroy();
  }

  User.prototype.usersWithNoRelationship = async function() {
    return await sequelize.query(`SELECT Users.* from Users LEFT JOIN Relationships on (requester_id = Users.id OR requestee_id = Users.id) WHERE requester_id IS NULL AND requestee_id IS NULL`, { model: User });
  }


  User.prototype.usersRequestingFriendshipWithMe = async function() {
    return await sequelize.query(`SELECT Users.* from Users JOIN Relationships on requester_id = Users.id WHERE requestee_id = ${this.id} AND status = 'pending'`, { model: User });
  }

  User.prototype.usersIamRequestingFriendshipWith = async function() {
    return await sequelize.query(`SELECT Users.* from Users JOIN Relationships on requestee_id = Users.id WHERE requester_id = ${this.id} AND status = 'pending'`, { model: User });
  }

  User.prototype.friendsList = async function() {
    return await sequelize.query(`SELECT Users.* from Users JOIN Relationships on (requester_id = Users.id OR requestee_id = Users.id) AND Users.id != ${this.id} WHERE (requester_id = ${this.id} OR requestee_id = ${this.id}) AND status = 'accepted'  GROUP BY Users.id`, { model: User });
  }

  User.prototype.friendsUploadedImages = async function() {
    const sql = 
      `SELECT Images.* from Relationships JOIN Users JOIN Images
       ON (requester_id = Users.id OR requestee_id = Users.id) 
         AND Users.id = Images.uploaded_image_user_id
         AND Users.id != ${this.id}
       WHERE requester_id = ${this.id} OR requestee_id = ${this.id}`;

    return await sequelize.query(sql, { model: Image });
  }

  return User;
};
