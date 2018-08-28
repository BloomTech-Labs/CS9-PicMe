import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import './css/browse.css';


class Browse extends Component {
  state = {
    id: ''
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleClick = e => {
    e.preventDefault();
    this.props.history.push('/friend/uploads/' + this.state.id);
  }

  render() {
    return (
      <div className="inputContainer">
        <h2 className="inputLabel">Input your friend's unique code here:</h2>
        <Input action={{ content: 'Browse', onClick: this.handleClick }} label='Unique code:' name="id" value={this.state.id} onChange={this.handleInput} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default Browse;
