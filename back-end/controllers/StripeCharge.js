const Sequelize = require("sequelize");
const db = require("../db/dbconnection");
const User = require('../db/models/user')(db, Sequelize);
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
//Stripe requires a secret key given through their web app, in developers section

const StripeCharge = async (req, res) => {
  const token = req.body.stripeTokenId;
  const credits = req.body.credits;
  const currentUserEmail = req.body.currentUserEmail; 
  const charge =  stripe.charges.create({ //Goes through stripe's api to charge their account
    amount: amount,
    currency: "USD",
    source: token
  }, function(err, charge) {
    if(err) {
      res.status(400).json({Message: "Error charging card"}) //if error 
      console.log(err)
    }

    else {
      User.findOne({ where: { email: email } }).then(user => {
        if(!user) {
          return res.status(422).json({error: 'No user with that email found'});
        }
        else {
          user.credits += credits;
          user.save();
        }
      }).catch(err => res.status(500).json(err))

      res.status(200).json({Message: "Successfully charged account"}) //If no error give us a success message
    }
  })
}

module.exports = {
  StripeCharge
}
