import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout"; //An npm package to simplify the process
import axios from "axios";

class Billing extends Component {

    onToken = (amount, description) => token => {
        console.log(amount, description, token.id)
        axios.post(`${process.env.REACT_APP_API}/charge`, //Will need to change when in development
        {
        description,
        currency: "USD",
        amount: amount,
        token: token.id //Token is created below through stripecheckout
        })
        .then(response => {
            alert("Success")
            console.log(response)
        })
        .catch(err => {
            console.log(err)
            alert("Error Processing Payment")
        });

    }  

    render() {
        return(
            <div>
            <StripeCheckout
            token={this.onToken(500, "Buying pups")} //500 as in cents, stripe uses cents not dollars
            stripeKey="pk_test_82oWHtkpQ5D2JsxaliVsOZwi" //Can be shared as long as secret key remains private
            />
            </div>
        )
    }
}

export default Billing;
