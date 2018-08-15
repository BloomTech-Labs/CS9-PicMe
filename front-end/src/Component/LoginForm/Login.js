import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    //function to set the state of email upon input update
    onSignInFormChange = (event) => { this.setState({ [event.target.name]: event.target.value })}

    render () {
        return(
            //tachyons styling inside of classname
            <article className="br3 bg-light-gray ba b--black-10 mv4 w-70 w-50-m w-25-l mt6 mw6 shadow-5 center text-center">
                <main className="pa4 black-80">
                    <form className="measure"> 
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="email-address"
                            >Email
                            </label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-black w-100" 
                            type="email" 
                            name="email"  
                            id="email" 
                            //call on change for email
                            onChange={this.onSignInFormChange} />
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
                            onChange={this.onSignInFormChange} />
                            </div>
                        </fieldset>
                        <div className="">
                        <input 
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" />
                        </div>
                        <div 
                        className="lh-copy mt3">
                        <a 
                        href="#0" 
                        className="f6 link dim black db">No account? - Register</a>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Login;