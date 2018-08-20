import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom' //need this for history.push
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';

class LoginForm extends Component {
state = {
  email: '',
  password: ''
}

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    console.log("The input values are", Object.values(this.state));

    // make axios call to backend login route
    
    // Backend address: https://agile-garden-80213.herokuapp.com/signin
    axios
    .post(`http://localhost:5000/signin`, {
        email: this.state.email, 
        password: this.state.password
    })
    .then(response => {
      // Temp - set token here
      console.log("State: token: " + response.data.token);
      // if axios login call successful to go to..
      this.props.history.push('/navbar')
    })
    .catch(err => {
      alert("Invalid login credentials, please try again.");
      console.log(err);
    });
  }

  render() {
    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleInput}
                  name="email"
                  value={this.state.email}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="password"
                  value={this.state.password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a style={{textDecoration: 'underline'}} onClick={this.props.closeLoginOpenReg}>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const ModalContainer = props => (
  <Modal dimmer="blurring" style={{height: '24em', marginTop: '20em'}} size="tiny" open={props.openLogin} onClose={props.closeLogin} centered={false}>
      <LoginForm {...props} history={props.history} closeLoginOpenReg={props.closeLoginOpenReg} />
  </Modal>
)

const mapStateToProps = state => state;


export default connect(mapStateToProps, { fetchUser })(withRouter(ModalContainer));
