const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

const users = async (req, res) => {

  const { email } = req.params;

  const currentUser = await User.findOne({ where: { email: email } });

  let users = {};
  users['withNoRelationship'] = await currentUser.usersWithNoRelationship();
  users['requestingFriendshipWithMe'] = await currentUser.usersRequestingFriendshipWithMe();
  users['iamRequestingFriendshipWith'] = await currentUser.usersIamRequestingFriendshipWith();
  users['friends'] = await currentUser.friendsList();

  res.status(200).json(users);
}

module.exports = {
  users
};
