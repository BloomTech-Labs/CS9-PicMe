import React, { Component } from 'react'
// import './App.css';
import {Switch, Route} from 'react-router-dom'
import Stripe from './components/stripe'
import HomePage from './components/homepage.js'
import Navbar from './components/navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/stripe" component={Stripe}/>
          <Route exact path="/navbar" component={Navbar}/>
        </Switch>
      </div>
    );
  }
}

export default App;
