const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^

const update = (req, res) => {
  const {email, password} = req.body;
   
  User.update({ password: password },
    { where: { email: email }, individualHooks: true })
  .then(user => res.status(200).json({ success: true }))
  .catch(err => console.log(err))
}

module.exports = {
  update
}; //Exports the update controller to be used in routes