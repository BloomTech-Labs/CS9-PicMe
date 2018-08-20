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
        const image = new FormData();
        image.append("file", this.state.image) 
        image.append("upload_preset", "u03iyxti") //Sends data as a file to our server

        Axios({
            url: "http://localhost:5000/upload",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: image
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                    <input name="image" type="file" onChange={this.handleFileUpload}/>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default Upload;