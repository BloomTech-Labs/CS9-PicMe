import React, { Component } from 'react';
import './App.css';
import Tachyons from 'tachyons';
import Particles from 'react-particles-js';
import {Switch, Route} from "react-router-dom";
import Hello from "./Component/RoutingTest/RoutingTest.js"
import Stripe from "./Component/Stripe/Stripe.js"
import Login from "./Component/LoginForm/Login";
import Register from "./Component/Register/Register";
import LandingPage from "./Component/LandingPage/LandingPage";

// Options for the particle effects. 
const particlesOptions = {
  particles: {
    number: {
      value: 140,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Particles className="particles" params={particlesOptions} />
        <Switch>
          <Route exact path="/" component={Hello} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/stripe" component={Stripe}/>
        </Switch>
      </div>
    );
  }
}

export default App;
