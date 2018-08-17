import React, { Component } from 'react'
// import './App.css';
import {Switch, Route} from 'react-router-dom'
import Stripe from './components/stripe'
import LoginForm from './components/loginform'
import LandingPage from './components/landingpage.js'
import Navbar from './components/navbar'
import RegistrationForm from './components/registrationform'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/reg" component={RegistrationForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/stripe" component={Stripe}/>
          <Route exact path="/navbar" component={Navbar}/>
        </Switch>
      </div>
    );
  }
}

export default App;
