import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import LogIn from "./components/login";


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LogIn}/>
      </Switch>
    );
  }
}

export default App;
