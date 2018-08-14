const {signup} = require("../controllers/signup")

module.exports = server => {
    server.route('/signup').post(signup); //Export all routes from controllers
  };