const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require("../db/models/user")(db, Sequelize); 

const fetchUserId = (req, res) => {
    const email = req.body.email //Grabs email from request body
    

    User.findOne({where: {email: email}}).then(user => {
        res.status(200).json(user.id) //Sends the user Id needed to fetch images
    }).catch(err => {
        res.status(400).json({Err: "No user found"})
    })
}

module.exports = {
    fetchUserId
}