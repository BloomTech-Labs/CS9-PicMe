import React , { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'
import axios from "axios";

import UserNoRelationshipCard from './user-no-relationship-card';

class Friends extends Component {
  state = {
    users: {
      withNoRelationship: [],
      requestingFriendshipWithMe: [],
      iamRequestingFriendshipWith: [],
      friends: []
    } 
  }

  async componentDidMount() {
    const headers = { headers: { "Authorization": `Bearer ${window.localStorage.token}` }};
    const users = (await axios.get(`${process.env.REACT_APP_API}/users/${localStorage.email}`, headers)).data
    this.setState({ users: users });
    console.log(this.state.users.withNoRelationship);
  }
  
  render() {
    const users = this.state.users;
    return (
      <Fragment>
        <h4>Search for new Friends</h4><br />
        <Card.Group>
          { users.withNoRelationship.map(user => <UserNoRelationshipCard key={user} {...user}/>) }
        </Card.Group>
      </Fragment>
    )
  }
}
export default Friends
