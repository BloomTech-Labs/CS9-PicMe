import React, {Component} from "react";
import Axios from "axios";
import "./css/upload.css";
import Dropzone from 'react-dropzone';
   
class Upload extends Component{
    constructor() {
        super();
        this.state = {
            show: noShow,
            move: show,
            image: "",
        }
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

    onDrop(files) {
        this.setState({
            show: show,
            move: left
        })
        
        this.setState({
          image: files[0],
          preview: URL.createObjectURL(files[0])

        });
      }

    onSubmit = (event) => {
        event.preventDefault();
        const image = new FormData();
        image.append("file", this.state.image) 
        image.append("upload_preset", "u03iyxti") //Sends data as a file to our server
        image.append("api_key", "895718742668927")
        image.append("timestamp", (Date.now() / 1000) | 0);

        // image.append("Email", window.sessionStorage.email)



     Axios({
        url:"https://api.cloudinary.com/v1_1/picme/image/upload",
        method: "POST",
        headers: { 
            "X-Requested-With": "XMLHttpRequest"
        },
        data: image
    }).then(response => {
      const data = response.data;
      console.log(response)
      const uploads = {
          email: window.sessionStorage.email,
          name: data.public_id,
          url: data.url,
      }

      Axios.post(`${process.env.REACT_APP_API}/upload`, uploads)
      .then(res => {
          console.log(res);
          window.location.reload()
      }).catch(err => {
          console.log(err);
      })
    }).catch(err => {
        console.log(err)
    })
}

    render() {
        return (
            <div className="uploads">
                <div>
                    <img src={this.state.preview} alt="" width="50%" height="40%"/>
                </div>

                <form id="Uploads__form" onSubmit={this.onSubmit} encType='multipart/form-data'>

                <div className="dropzone">
                <Dropzone disableClick={true} className="dropzone__input" onDrop={this.onDrop.bind(this)}>
                    <p>Drop a file to upload or  

                        <input style={noShow} name="image" id="file" type="file" onChange={this.handleFileUpload}/>
                        <label htmlFor="file">Choose a file</label>
                    </p>
                </Dropzone>
                </div>
                    <div className="Uploads__pic">
                        <div className="tablet__label">
                            <input  style={noShow} name="image" id="file" type="file" onChange={this.handleFileUpload}/>
                            <label htmlFor="file">Choose a file</label>
                        </div>
                        <button style={this.state.show} type="submit">submit</button>
                    </div>
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
