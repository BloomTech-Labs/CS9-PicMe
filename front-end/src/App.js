import React, { Component } from 'react';
// import './App.css';
import {Switch, Route} from 'react-router-dom';
import Billing from './components/billing';
import HomePage from './components/homepage';
import Layout from './components/top-nav-bar-layout';
import ProfileSettings from "./components/profile-settings";
import PhotoBrowser from './components/PhotoBrowser';
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/settings" component={ProfileSettings}/>
          <Layout>
            <Route exact path="/billing" component={Billing}/>
            <Route exact path="/browse" component={PhotoBrowser} />
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
