import React, { Component } from 'react'
// import './App.css';
import {Switch, Route} from 'react-router-dom'
import Billing from './components/billing'
import HomePage from './components/homepage'
import Layout from './components/top-nav-bar-layout'
import Upload from "./components/upload"
import ProfileSettings from "./components/profile-settings"

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/upload" component={Upload}/>
          <Route exact path="/settings" component={ProfileSettings}/>
          <Layout>
            <Route exact path="/billing" component={Billing}/>
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
