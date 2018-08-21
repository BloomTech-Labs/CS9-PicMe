import React, {Component} from "react";
import Axios from "axios";
import { WithContext as ReactTags } from 'react-tag-input';
import "./css/upload.css"

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Upload extends Component{
    constructor() {
        super();
        this.state = {
            tags: [

            ],
            image: ""
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }


    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }

    handleFileUpload = (e) => {
        this.setState({
            image: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0])
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
        const { tags, suggestions } = this.state;
        return (
            <div>
                <div>
                    <img src={this.state.preview} width="50%" height="40%"/>
                </div>

                <input name="image" type="file" onChange={this.handleFileUpload}/>
                
                <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                />
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default Upload;