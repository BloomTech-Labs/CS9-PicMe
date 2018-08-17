import React, {Component} from 'react';
import "./css/navbar.css"

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            show: noshow
        }
    }


    showUserNav = () => {
        if(this.state.show === noshow) {
            this.setState({
                show: show
            })
        }

        else {
            this.setState({
                show: noshow
            })
        }
    }
    render() {
        return(
            <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
                <nav className="f4 ttu tracked tr">
                    <a className="link dim white dib mr3" href="" title="Home">Home</a>
                    <a className="link dim white dib mr3" href="" title="About">Uploads</a>
                    <a className="link dim white dib mr3" href="" title="Store">Collections</a>
                    <a className="purple mr3" href="" title="Contact">Credits: 50</a>
                    <a onClick={this.showUserNav} className="link dim white dib mr3" href="" title="Store">User<div className="arrow-down dib mr3"></div></a>
                </nav>
    
                    <div style={this.state.show} className="User__card">
                        {/* <h1 className="f4 bold center mw5">Cats</h1> */}
                        <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
                        <li className="ph3 pv2 bb b--light-silver">Mackeral Tabby</li>
                        <li className="ph3 pv2 bb b--light-silver">Burmese</li>
                        <li className="ph3 pv2 bb b--light-silver">Maine Coon</li>
                        <li className="ph3 pv2 bb b--light-silver">Orange Tabby</li>
                        <li className="ph3 pv2 bb b--light-silver">Siamese</li>
                        <li className="ph3 pv2 bb b--light-silver">Scottish Fold</li>
                        <li className="ph3 pv2">American Bobtail</li>
                        </ul>
                    </div>
            </header>
        )
    }
}

const show = {

}

const noshow = {
    display: "none"
}
export default Navbar
