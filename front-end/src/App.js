import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import Hello from "./components/RoutingTest/RoutingTest.js"


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Hello}/>
      </Switch>
    );
  }
}

export default App;
