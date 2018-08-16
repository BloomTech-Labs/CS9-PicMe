const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
//Stripe requires a secret key given through their web app, in developers section

const StripeCharge = (req, res) => {
    const token = req.body.token;
    const amount = req.body.amount;
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
            res.status(200).json({Message: "Successfully charged account"}) //If no error give us a success message
        }
    })
}

module.exports = {
    StripeCharge
}