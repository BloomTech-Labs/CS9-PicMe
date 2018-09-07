import React , { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'
import axios from "axios";

import FriendCard from './friend-card';

class Friends extends Component {
  state = {
    users: {
      noRelationship: [],
      pending: [],
      requests: [],
      friends: []
    } 
  }

  async componentDidMount() {
    const headers = { headers: { "Authorization": `Bearer ${window.localStorage.token}` }};
    const users = (await axios.get(`${process.env.REACT_APP_API}/users/${localStorage.email}`, headers)).data
    this.setState({ users });
  }

  requestFriend = async (user) => {
    const payload = {
      friend: user,
      email: localStorage.email
    }

    const headers = {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    };

    const users = (await axios.post(`${process.env.REACT_APP_API}/request-friend`, payload, headers)).data;
    console.log('updated usrs', users)
    this.setState({ users });
  }
  
  unfriend = async user => {
    const payload = {
      friend: user,
      email: localStorage.email
    }

    const headers = {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    };

    const users = (await axios.post(`${process.env.REACT_APP_API}/unfriend`, payload, headers)).data;
    console.log('updated usrs', users)
    this.setState({ users });
  }

  acceptFriend = async user => {
    const payload = {
      friend: user,
      email: localStorage.email
    }

    const headers = {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    };

    const users = (await axios.post(`${process.env.REACT_APP_API}/request-friend`, payload, headers)).data;
    console.log('updated usrs', users)
    this.setState({ users });
  }

  render() {
    const users = this.state.users;
    return (
      <Fragment>
        <h4>Search for new Friends</h4><br />
        <Card.Group>
          { users.noRelationship.map(user => <FriendCard handleButton1Click={this.requestFriend} key={user.id} {...user} btnTxt="Request Friend" />) }
        </Card.Group>

        <br />
        <h4>Current Friends</h4>
        <Card.Group>
          { users.friends.map(user => <FriendCard handleButton1Click={this.unfriend} key={user.id} {...user} btnTxt="Unfriend" btnColor="red" />) }
        </Card.Group>

        <br />
        <h4>Pending Friend Requests</h4>
        <Card.Group>
          { users.pending.map(user => <FriendCard handleButton1Click={this.acceptFriend} handleButton2Click={this.declineFriend} key={user.id} {...user} pending />) }
        </Card.Group>

        <br />
        <h4>Your Friend Requests</h4>
        <Card.Group>
          { users.requests.map((user, i) => <FriendCard key={user.id} {...user} />) }
        </Card.Group>
      </Fragment>
    )
  }
}
export default Friends
