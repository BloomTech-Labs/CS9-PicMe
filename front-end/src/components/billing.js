import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "./billingform";
import axios from 'axios';

import "./css/billing.css";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentUser: null
    };
  }


  async buyCredits(payload) {
    axios.post(`${process.env.REACT_APP_API}/charge`, payload);
  }

  handleFormSubmit = async (credits, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.buyCredits({
        currentUserEmail: sessionStorage.getItem('email'), 
        credits,
        stripeTokenId: token.id
      });

      alert("Your card has been charged successfully!");
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Settings">
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <Elements>
            <BillingForm
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
