const {signup} = require("../controllers/signup")
const {signin} = require("../controllers/signin")

module.exports = server => {
    server.route('/signup').post(signup); //Export all routes from controllers
    server.route('/signin').post(signin);
  };