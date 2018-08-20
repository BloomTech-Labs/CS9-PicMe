import React, { Component } from 'react'
// import './App.css';
import {Switch, Route} from 'react-router-dom'
import Billing from './components/billing'
import HomePage from './components/homepage'
import Layout from './components/top-nav-bar-layout'
import ProfileSettings from "./components/profile-settings"
import PhotosBrowser from './components/PhotosBrowser';


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/settings" component={ProfileSettings} />
          <Route exact path="/browse" component={PhotosBrowser} />
          <Layout>
            <Route exact path="/billing" component={Billing} />
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
