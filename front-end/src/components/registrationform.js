import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom' //need this for history.push
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, newUser } from '../actions/userActions';

class RegistrationForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    console.log("The input values are", Object.values(this.state));
    // make axios call to backend registration route

    this.props.newUser();

    // if axios registration call successful to go to..
    this.props.history.push('/navbar')
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
          <Grid.Column style={{ maxWidth: 650 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Register for a new account  
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleInput}
                  name="first_name"
                  value={this.state.first_name}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='First Name'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="last_name"
                  value={this.state.last_name}
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                />
                <Form.Input
                  onChange={this.handleInput}
                  name="email"
                  value={this.state.email}
                  fluid icon='mail'
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
                <Form.Input
                  onChange={this.handleInput}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password Confirm'
                  type='password'
                />

                <Button color='teal' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const ModalContainer = props => (
  <Modal dimmer="blurring" style={{height: '34em', marginTop: '10em'}} size="small" open={props.openLogin} onClose={props.closeLogin} centered={false}>
      <RegistrationForm {...props} history={props.history} />
  </Modal>
)

const mapStateToProps = state => state;

export default connect(mapStateToProps, { newUser })(withRouter(ModalContainer));
