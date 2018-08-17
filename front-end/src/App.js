import React, { Component } from 'react';
// import './App.css';
// import Tachyons from 'tachyons';
// import Particles from 'react-particles-js';
import {Switch, Route} from "react-router-dom";
import Stripe from "./Component/Stripe/Stripe.js"
import Login from "./Component/LoginForm/Login";
import Register from "./Component/Register/Register";
import LandingPage from "./Component/LandingPage/LandingPage";
import Navbar from "./Component/Navbar/Navbar";
import { Provider } from 'react-redux';
import store from './store';


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
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/stripe" component={Stripe}/>
            <Route exact path="/navbar" component={Navbar}/>
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
