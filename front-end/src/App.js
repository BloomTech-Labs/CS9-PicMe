import React, { Component } from 'react';
// import './App.css';
import {Switch, Route} from 'react-router-dom';
import Billing from './components/billing';
import HomePage from './components/homepage';
import Layout from './components/top-nav-bar-layout';
import ProfileSettings from "./components/profile-settings";
import Upload from "./components/upload";
import Uploads from "./components/uploads";
import MyCollectionPage from './components/MyCollectionPage';
import { BrowserRouter } from "react-router-dom";
import Browse from './components/browse';
import friendsUploads from "./components/friendsUploads";
import AboutUs from "./components/AboutUs";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Layout>
            <Route exact path="/billing" component={Billing}/>
            <Route exact path="/upload" component={Upload}/>
            <Route exact path="/uploads" component={Uploads}/>
            <Route exact path="/settings" component={ProfileSettings}/>
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/collection" component={MyCollectionPage} />
            <Route path="/friend/uploads" component={friendsUploads}/>
            <Route exact path="/aboutus" component={AboutUs}/>
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
