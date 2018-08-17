const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^

const update = (req, res) => {
  const currEmail = req.body.currEmail //will grab current email if it is being changed
  const {email, password, first_name, last_name, nick_names, credits} = req.body;
  if (currEmail) {
    User.update({email, first_name, last_name, nick_names, credits },
      { where: { email: currEmail }, individualHooks: true })
    .then(user => {
      if (password) {
        User.update({ password }, { where: { email: currEmail }, individualHooks: true })
        .then(user2 => res.status(200).json(user2))
        .catch(err => res.status(500).json(err));
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => res.status(500).json(err))
  } else {
    res.status(400).json({success: false, message: 'Please include a user email.'});
  }
}

module.exports = {
  update
}; //Exports the update controller to be used in routes