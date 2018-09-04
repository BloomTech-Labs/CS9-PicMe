import React ,{ Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import axios from "axios";

import FriendCard from './friendcard';

class CardExampleGroups extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    const headers = { headers: { "Authorization": `Bearer ${window.localStorage.token}` }};
    const users = (await axios.get(`${process.env.REACT_APP_API}/users/${localStorage.email}`, headers)).data
    console.log(users);
  }
  
  render() {
    return (
      <Card.Group>
        <FriendCard />
      </Card.Group>
    )
  }
}
export default CardExampleGroups
