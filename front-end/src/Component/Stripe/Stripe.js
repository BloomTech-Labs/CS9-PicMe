import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Stripe extends Component {

    onToken = (amount, description) => token => {
        console.log(amount, description, token.id)
        axios.post("http://localhost:5000/charge",
        {
        description,
        currency: "USD",
        amount: amount,
        token: token.id
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
                <h1>LOLS</h1>

            <StripeCheckout
            token={this.onToken(500, "Buying pups")}
            stripeKey="pk_test_82oWHtkpQ5D2JsxaliVsOZwi"
            />
            </div>
        )
    }
}

export default Stripe;