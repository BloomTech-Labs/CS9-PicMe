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
            show: noShow,
            move: show,
            tags: [

            ],
            image: "",
            uploadTags: [

            ]
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
            show: show,
            move: left
        })
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

        if(this.state.tags.length >= 1) {
            this.state.tags.forEach(tag => {
                this.state.uploadTags.push(tag.id);
            })
        } else {
            this.setState({
                uploadTags: null
            })
        }

        image.append("Tags", this.state.uploadTags)
        image.append("Email", window.sessionStorage.email)



        Axios({
            url: `${process.env.REACT_APP_API}/upload`,
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: image
        }).then(res => {
            console.log(res);
            window.location.reload();
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

                <form onSubmit={this.onSubmit} encType='multipart/form-data'>
                    <div className="Upload__tags">
                        <input style={noShow} name="image" id="file" type="file" onChange={this.handleFileUpload}/>
                        <label style={this.state.move} for="file">Choose a file</label>
                        <div style={this.state.show}>
                        <ReactTags tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters} 
                        />
                        </div>
                    </div>
                    <button style={this.state.show} type="submit">submit</button>
                </form>
            </div>
        )
    }
}

const noShow={
    display: "none"
}

const show = {

}
const left = {
    position: "relative",
    right: "4rem"
}

export default Upload;