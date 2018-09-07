const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

const requestFriend = async (req, res) => {

  const { email, friend } = req.body;
  console.log('friend is', friend)

  const currentUser = await User.findOne({ where: { email: email } });

  await currentUser.friendRequest(friend);

  let users = {};
  users['noRelationship'] = await currentUser.usersWithNoRelationship();
  // console.log("no relationship", users['noRelationship']);
  users['pending'] = await currentUser.usersRequestingFriendshipWithMe();
  users['requests'] = await currentUser.usersIamRequestingFriendshipWith();
  users['friends'] = await currentUser.friendsList();

  res.status(200).json(users);
}

module.exports = {
  requestFriend
};
