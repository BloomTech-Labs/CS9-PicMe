import React, { Component } from 'react';
// import './App.css';
import {Switch, Route} from "react-router-dom";
import Stripe from "./Component/Stripe/Stripe.js"
import LoginForm from "./Component/loginform";
import Register from "./Component/Register/Register";
import LandingPage from "./Component/LandingPage/LandingPage";
import Navbar from "./Component/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/stripe" component={Stripe}/>
          <Route exact path="/navbar" component={Navbar}/>
        </Switch>
      </div>
    );
  }
}

export default App;
