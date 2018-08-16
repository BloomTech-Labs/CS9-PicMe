const {signup} = require("../controllers/signup")
const {signin} = require("../controllers/signin")
const {StripeCharge} = require("../controllers/StripeCharge")
module.exports = server => {
    server.route('/signup').post(signup); //Export all routes from controllers
    server.route('/signin').post(signin);
    server.route('/charge').post(StripeCharge)
  };