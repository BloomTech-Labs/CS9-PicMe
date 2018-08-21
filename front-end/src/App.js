import React, { Component } from 'react';
// import './App.css';
import {Switch, Route} from 'react-router-dom';
import Billing from './components/billing';
import HomePage from './components/homepage';
import Layout from './components/top-nav-bar-layout';
import ProfileSettings from "./components/profile-settings";
import Upload from "./components/upload";
import PhotoBrowser from './components/PhotoBrowser';
import MyCollectionPage from './components/MyCollectionPage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Layout>
            <Route exact path="/billing" component={Billing}/>
            <Route exact path="/upload" component={Upload}/>
            <Route exact path="/settings" component={ProfileSettings}/>
            <Route exact path="/browse" component={PhotoBrowser} />
            <Route exact path="/collection" component={MyCollectionPage} />
          </Layout>
        </Switch>
      </div>
    );
  }
}

export default App;
