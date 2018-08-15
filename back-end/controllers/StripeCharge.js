const stripe = require("stripe")("sk_test_FzuQBWrxZ48RCciL6zkmJdJl");
const bodyparser = require("body-parser");


const StripeCharge = (req, res) => {
    console.log(req.body);
    const token = req.body.token;
    const amount = req.body.amount;
    const charge =  stripe.charges.create({
        amount: amount,
        currency: "USD",
        source: token
    }, function(err, charge) {
        if(err) {
            res.status(400).json({Message: "Error charging card"})
            console.log(err)
        }

        else {
            res.status(200).json({Message: "Successfully charged account"})
        }
    })
}

module.exports = {
    StripeCharge
}