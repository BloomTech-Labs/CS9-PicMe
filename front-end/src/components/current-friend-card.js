import React , { Component } from 'react'
import { Button, Card, Image, Icon } from 'semantic-ui-react'

class CurrentFriendCard extends Component {
  
  render() {
    const { fullName } = this.props;
    return (
        <Card>
          <Card.Content>
            <Card.Header style={{float: 'left'}}>{ fullName }</Card.Header>
            <Icon name='user circle' size='large' style={{float: 'right'}}/>
          </Card.Content>
          <Card.Content extra>
            <div className='ui center aligned'>
              <Button basic color='red'>
                Unfriend 
              </Button>
            </div>
          </Card.Content>
        </Card>
    )
  }
}
export default CurrentFriendCard;
