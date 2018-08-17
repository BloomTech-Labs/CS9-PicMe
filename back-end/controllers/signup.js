const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 
//Database initializers, used to make queries ^


const signup = (req, res) => {
  const {first_name, last_name, email, password} = req.body;

  const createUser = async () => {
    await User.create({ 
      first_name: first_name || "", //Added "" to check if there is a length > 1, otherwise an error stating undefined variable
      last_name: last_name || "",
      email: email || "",
      password: password || "", 
      nick_names: null,
      credits: 0
    }).then().catch(err => {
      res.status(400).json({Error: "Email in use"})
    })
    //Responses had to be done here, otherwise the code would send success as it's an asynchronous function
    res.status(200).json({Message: "Success"})
  }

  if (first_name && last_name && email && password) { //Makes sure no field is left blank
    createUser(); //If all fields filled, creates a user
  }
  else {
    res.status(400).json({Error: "Please make sure all fields are filled out"})
  }
}

module.exports = {
  signup
}; //Exports the signup controller to be used in routes