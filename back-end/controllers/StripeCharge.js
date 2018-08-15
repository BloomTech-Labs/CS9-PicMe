const stripe = require("stripe")("sk_test_FzuQBWrxZ48RCciL6zkmJdJl");
const bodyparser = require("body-parser");


const StripeCharge = (req, res) => {
    console.log("Reached")
    console.log(req.body)
    res.status(200).json({Message: "Works"})
}

module.exports = {
    StripeCharge
}