import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import Hello from "./Component/RoutingTest/RoutingTest.js"
import Stripe from "./Component/Stripe/Stripe.js"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Hello}/>
        <Route exact path="/stripe" component={Stripe}/>
      </Switch>
    );
  }
}

export default App;
