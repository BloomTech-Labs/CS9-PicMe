import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./loaderbutton";
import "./css/billingform.css";

class BillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      credits: "",
      isProcessing: false,
      isCardComplete: false
    };
  }

  validateForm() {
    return (
      this.state.name !== "" &&
      this.state.credits !== "" &&
      this.state.isCardComplete
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    });
  }

  handleSubmitClick = async event => {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ isProcessing: true });

    const { token, error } = await this.props.stripe.createToken({ name });

    this.setState({ isProcessing: false });

    this.props.onSubmit(this.state.credits, { token, error });
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading;

    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <FormGroup bsSize="large" controlId="credits">
          <ControlLabel>Storage</ControlLabel>
          <Checkbox> 100 Credits - $9.99</Checkbox>
          <Checkbox> 5 Credits - $0.99</Checkbox>
        </FormGroup>
        <FormGroup bsSize="large" controlId="name">
          <ControlLabel>Cardholder&apos;s name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={this.handleFieldChange}
            placeholder="Name on the card"
          />
        </FormGroup>
        <ControlLabel>Credit Card Info</ControlLabel>
        <CardElement
          className="card-field"
          onChange={this.handleCardFieldChange}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
          }}
        />
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          text="Purchase"
          isLoading={loading}
          loadingText="Purchasing…"
          disabled={!this.validateForm()}
        />
      </form>
    );
  }
}

export default injectStripe(BillingForm);
