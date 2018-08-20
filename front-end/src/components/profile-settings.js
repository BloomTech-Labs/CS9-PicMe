import React, {Component} from 'react';
import {Container, Header, Segment, Input, Button} from "semantic-ui-react";
import "./css/profile-settings.css";
// import Navbar from "../Navbar/Navbar"
import Axios from "axios";
import Closed from "./icons/closed.png";
import Open from "./icons/open.png"
import "./css/settings.css"

class ProfileSettings extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "", //With redux defualt values will be user's info
            lastName: "",
            email: "",
            password: "",
            nickname: "",
            //Styling below
            closed: show,
            open: noshow,
            showPass: "password"
        }
    }


    onEyeClick = () => {
        if(this.state.closed === show) { //Makes password visible and changes icon
            this.setState({
                closed: noshow,
                open: show,
                showPass: "text"
            })
        }

        else {
            this.setState({
                closed: show,
                open: noshow,
                showPass: "password"
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            currEmail: "test@test.com", //Update will only work on a user with this email currently, will grab user info when implemented
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            nick_names: this.state.nickname,
            credits: 10
        }

        Axios.put("http://localhost:5000/update", updatedUser)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err)
        })
    }

    //Post method will be here, server needs work first


    render() {
        return(
            <div className="settings__nav">
                <form onSubmit={this.onSubmit} className="settings">
                    <Header as='h3' content='Edit Profile' style={style.h3} textAlign='center' />
                    <Container text>
                    <Segment.Group>
                        <Segment>First Name: <Input name="firstName" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Last Name <Input name="lastName" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Email: <Input name="email" onChange={this.onChange} type="text"/></Segment>
                        <Segment>Password: <Input name="password" type={this.state.showPass} onChange={this.onChange}/>
                        <img onClick={this.onEyeClick} style={this.state.closed} src={Closed} alt="Password hidden"/>
                        <img onClick={this.onEyeClick} style={this.state.open} src={Open} alt="Password hidden"/>
                        </Segment>
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
    h3: {
      marginTop: '0',
      paddingTop: '5rem',
    }
  }


  const show = {

}

const noshow = {
    display: "none"
}

export default ProfileSettings;