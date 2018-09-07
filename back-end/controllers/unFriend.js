const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

const unFriend = async (req, res) => {

  const { email, friend } = req.body;
  console.log('friend is', friend)

  const currentUser = await User.findOne({ where: { email: email } });

  await currentUser.unFriend(friend);
  console.log('!!!!!!!!!11 got here')

  let users = {};
  users['noRelationship'] = await currentUser.usersWithNoRelationship();
  users['pending'] = await currentUser.usersRequestingFriendshipWithMe();
  users['requests'] = await currentUser.usersIamRequestingFriendshipWith();
  users['friends'] = await currentUser.friendsList();

  res.status(200).json(users);
}

module.exports = {
  unFriend
};
