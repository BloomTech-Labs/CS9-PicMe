const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize);

// User.belongsToMany(Image, { through: 'user_collection_image', as: 'CollectionImages'});
// Image.belongsToMany(User, { through: 'user_collection_image', as: 'Users'});

const currentuser = (req, res) => {
  const { email } = req.query;
  console.log('!!!!!!!!!!! backend email is', email);
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that email found'});
    }
    else {
  console.log('!!!!!!!!!!! backend user is', user);
      res.status(200).json(user);
    }
  }).catch(err => res.status(500).json(err))
}

module.exports = {
  currentuser
};
