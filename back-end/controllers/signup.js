const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^


const signup = (req, res) => {
  const {first_name, last_name, email, password, nick_names} = req.body;

  const createUser = async () => {
    await User.create({ 
      first_name: first_name || "", //Added "" to check if there is a length > 1, otherwise an error stating undefined variable
      last_name: last_name || "",
      email: email || "",
      password: password || "", 
      nick_names: nick_names || "",
      credits: 0
    }).then().catch(err => {
      res.status(400).json({Error: "Email in use"})
    })
    //Responses had to be done here, otherwise the code would send success as it's an asynchronous function
    res.status(200).json({Message: "Success"})
  }

  if (first_name.length < 1 || last_name < 1 || 
    nick_names < 1 || email < 1 || password < 1) {
      //Makes sure no field is left blank
      res.status(400).json({Error: "Please make sure all fields are filled out"})
    }
  else {
    createUser(); //If all fields filled, creates a user
  }
}

module.exports = {
  signup
}; //Exports the signup controller to be used in routes