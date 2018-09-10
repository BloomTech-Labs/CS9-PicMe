import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import './css/browse.css';


let windowSize = window.innerWidth
class Browse extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      width: window.innerWidth
    }
  }
  

  componentDidMount() {
    window.addEventListener("resize", this.resize) //Listens to resizes on window and performs wanted action
  }

  resize = () => {
    windowSize = window.innerWidth
    this.setState({ 
      width: windowSize
    })
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleClick = e => {
    e.preventDefault();
    if(this.state.id.length < 1) return //Checks to make sure it's not empty
    this.props.history.push('/friend/uploads/' + this.state.id);
  }

  render() {
    return (this.state.width >= 520 )  ? (
      //Changed to form so a user can hit enter to submit
      <div className="form-container">
        <form onSubmit={this.handleClick} className="inputContainer">
          <h2 className="inputLabel">Input your friend's unique code here:</h2>
          <Input className="browse-input" placeholder={"Enter a unique code..."} action={{ content: 'Browse', onClick: this.handleClick }} label='Unique code:' name="id" value={this.state.id} onChange={this.handleInput} onSubmit={this.handleSubmit}/>
        </form>
      </div>
    ) : (
      <div className="form-container">
        <form onSubmit={this.handleClick} className="inputContainer">
          <h2 className="inputLabel">Input your friend's unique code here:</h2>
          <Input className="browse-input" placeholder={"Enter a unique code..."} label='Code:' name="id" value={this.state.id} onChange={this.handleInput} onSubmit={this.handleSubmit}/>
          <button className="browse-button" type="submit" onClick={this.handleClick}>Browse</button>
        </form>
      </div>
    )
  }
}

export default Browse;