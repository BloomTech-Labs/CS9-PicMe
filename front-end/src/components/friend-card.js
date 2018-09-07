import React , { Component } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'

class FriendCard extends Component {
  
  render() {
    const { fullName, btnTxt, btnColor, pending, handleButton1Click } = this.props;
    const color = btnColor || 'green';

    return (
        <Card>
          <Card.Content>
            <Card.Header style={{float: 'left'}}>{ fullName }</Card.Header>
            <Icon name='user circle' size='large' style={{float: 'right'}}/>
          </Card.Content>
          { btnTxt || pending ?
            <Card.Content extra>
              { pending ? 
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Accept
                  </Button>
                  <Button basic color='red'>
                    Decline
                  </Button>
                </div> :
                <div className='ui center aligned'>
                  <Button onClick={handleButton1Click.bind(this, this.props)} basic color={color}>
                     { btnTxt } 
                  </Button> 
                </div>
              }
            </Card.Content>
          : null }
        </Card>
    )
  }
}
export default FriendCard;
