import React, { Component } from 'react';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            nickName: ''
        }
    }

    //function to set the state of firstName upon input update
    onFirstNameInputChange = (event) => {
        this.setState({firstName: event.target.value});
    }

    //function to set the state of lastName upon input update
    onLastNameInputChange = (event) => {
        this.setState({lastName: event.target.value});
    }

    //function to set the state of email upon input update
    onEmailInputChange = (event) => {
        this.setState({email: event.target.value});
    }

    //function to set the state of password upon input update
    onPasswordInputChange = (event) => {
        this.setState({password: event.target.value});
    }

    //function to set the state of nickName upon input update
    onNickNameInputChange = (event) => {
        this.setState({nickName: event.target.value});
        //console.log(this.state);
    }

    render () {
        return(
            //tachyons styling inside of classname
            <article className="br3 bg-light-gray ba b--black-10 mv4 w-70 w-50-m w-25-l mt6 mw6 shadow-5 center text-center">
                <main className="pa4 black-80">
                    <form className="measure"> 
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <div className="mv3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="firstName"
                            >First Name
                            </label>
                            <input 
                            className="b pa2 input-reset ba hover-black bg-transparent w-100" 
                            type="text" 
                            name="firstName"  
                            id="first-name" 
                            //call onchange for pw
                            onChange={this.onFirstNameInputChange} />
                            </div>
                            <div className="mv3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="lastName"
                            >Last Name
                            </label>
                            <input 
                            className="b pa2 input-reset ba hover-black bg-transparent w-100" 
                            type="text" 
                            name="lastName"  
                            id="last-name" 
                            //call onchange for pw
                            onChange={this.onLastNameInputChange} />
                            </div>
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="email-address"
                            >Email
                            </label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-black w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            //call on change for email
                            onChange={this.onEmailInputChange} />
                        </div>
                        <div className="mv3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="password"
                            >Password
                            </label>
                            <input 
                            className="b pa2 input-reset ba hover-black bg-transparent w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            //call onchange for pw
                            onChange={this.onPasswordInputChange} />
                            </div>
                            <div className="mv3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="nickName"
                            >Nick Name
                            </label>
                            <input 
                            className="b pa2 input-reset ba hover-black bg-transparent w-100" 
                            type="text" 
                            name="nickName"  
                            id="nick-name" 
                            //call onchange for pw
                            onChange={this.onNickNameInputChange} />
                            </div>
                        </fieldset>
                        <div className="">
                        <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Get Started" />
                        </div>
                        <div 
                        className="lh-copy mt3">
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;