const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^

const signin = (req, res) => {
  const {email, password} = req.body;
   
  User.findOne({ where: { email: email } }).then(user => {
    if(!user) {
      return res.status(422).json({error: 'No user with that name found.'});
    }
    else {
      return res.status(200).json(user);
    }
  }).catch(err => console.log(err))
}

module.exports = {
  signin
}; //Exports the signin controller to be used in routes