import React, {Component} from "react";
import Axios from "axios";

class Upload extends Component{
    constructor() {
        super();
        this.state = {
            image: ""
        }
    }

    handleFileUpload = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append("image", this.state.image, this.state.image.name);

        Axios.post("http://localhost:5000/upload", this.state.image)
        .then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="file" onChange={this.handleFileUpload}/>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default Upload;