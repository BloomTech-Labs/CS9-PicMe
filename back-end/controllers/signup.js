const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^


const signup = (req, res) => {
  const {email, password} = req.body;   //Sign up only needs email/pass

  const createUser = async () => {
    await User.create({ //Creates users, only email and password are passed in, rest are null
      first_name: null,
      last_name: null,
      nick_name: null,
      email: email,
      password: password, 
      credits: null
    })
  }

  if (email === undefined || password === undefined) {
    //Checks if email or password are null
    //No security as of yet
    res.send("Please provide an email and password") 

  }
  else {
    try {
      createUser();
      res.send("Success"); //Testing purposes so see if creation worked
    } catch (err) {
      res.send(err);
    }
  }



}

module.exports = {
  signup
}; //Exports the signup controller to be used in routes