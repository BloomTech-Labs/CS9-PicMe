import React, {Component} from 'react';
import {Container, Header, Segment, Input, Button} from "semantic-ui-react";
import "./css/profile-settings.css";
// import Navbar from "../Navbar/Navbar"


class ProfileSettings extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "", //With redux defualt values will be user's info
            lastName: "",
            email: "",
            password: "",
            nickname: ""
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Post method will be here, server needs work first


    render() {
        return(
            <div className="settings__nav">
                {/* <Navbar/> */}
                <form className="settings">
                    <Header as='h3' content='Edit Profile' style={style.h3} textAlign='center' />
                    <Container text>
                    <Segment.Group>
                        <Segment>First Name: <Input name="firstName" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Last Name <Input name="lastName" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Email: <Input name="email" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Password: <Input name="password" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Nickname: <Input name="nickname" onChange={this.onChange} type="text"/></Segment>
                    </Segment.Group>
                    <Button type="submit" content='Save' primary />
                    </Container>
                </form>
            </div>
        )
    }
}

const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '0',
      paddingTop: '7rem',
    },
    last: {
      marginBottom: '300px',
    },
  }
  

export default ProfileSettings;