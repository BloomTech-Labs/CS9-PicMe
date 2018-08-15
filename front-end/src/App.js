import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import SignIn from "./components/signin";


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignIn}/>
      </Switch>
    );
  }
}

export default App;
