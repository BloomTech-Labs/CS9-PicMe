import React, { Component } from 'react'
// import './App.css';
import {Switch, Route} from 'react-router-dom'
import Billing from './components/billing'
import HomePage from './components/homepage'
import Layout from './components/top-nav-bar-layout'
import Upload from "./components/upload"

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/upload" component={Upload}/>
          <Layout>
            <Route exact path="/billing" component={Billing}/>
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
