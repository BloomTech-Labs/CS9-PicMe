import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import axios from "axios";
import SelectedImage from "./SelectedImage";


export default class Uploads extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: [],
            id: "",
            show: nowshow
        };
        // select photo binding
        this.selectPhoto = this.selectPhoto.bind(this);
        // select binding
        this.toggleSelect = this.toggleSelect.bind(this);
        // add to collection binding
        this.toggleSubmit = this.toggleSubmit.bind(this);
        // download selected
        this.toggleDownloadSelected = this.toggleDownloadSelected.bind(this);
    }

    // select photo function
    selectPhoto(event, obj) {
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
    }

    // select all photos function
    toggleSelect() {
        let photos = this.state.photos.map((photo, index) => {
            return { ...photo, selected: !this.state.selectAll };
        });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
    }

    //submit
    toggleSubmit(event, obj, index) {
        alert("Selected Photos have been removed from your uploads.");
    }

    toggleDownloadSelected(event, obj, index) {
        alert("Now downloading your selected images...");
    }

    show = () => {
        if(this.state.show === nowshow) { 
            this.setState({
                show: show
            })
        } else {
            this.setState({
                show: nowshow
            })
        }
    }

    componentDidMount() {
        axios.post(`${process.env.REACT_APP_API}/uploads`, {email: sessionStorage.getItem('email')}, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${window.sessionStorage.token}`
            }
        })
        .then(response => {
            const imgs = [];
            response.data.forEach(imgData => {
                const img = { src: imgData.url, name: imgData.name };
                const image = new Image();
                image.src = img.src;
                img.width = image.naturalWidth;
                img.height = image.naturalHeight;
                imgs.push(img);
            })
            this.setState({photos: imgs});
        })
        .catch(err => console.error("Uploads CDM: ", err));
    }

    shareLink() {
        const email = {
            email: window.sessionStorage.email
        }
        axios.post(`${process.env.REACT_APP_API}/fetchUserId`, email)
        .then(response => {
            const id = response.data;

            let link = document.getElementById("link");
            link.innerHTML = `${process.env.REACT_APP_FE}/friend/uploads/${id}`;

            let code = document.getElementById("code");
            code.innerHTML = `Code: ${id}`;

        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        return(
            <div className="component-wrapper">
            <div className="header-container">
                    <h1 className="header-title"> Your photo uploads: </h1>
                <div className="button-container">
                    <p>
                    <button className="toggle-select" onClick={this.toggleSelect}>
                        Select all images
                    </button>
                    <button className="toggle-download-selected" onClick={this.toggleDownloadSelected}>
                        Download selected images!
                    </button>
                    <button className="remove-from-your-collection" onClick={this.toggleSubmit}>
                        Remove selected images
                    </button>
                    </p>
                </div>
            </div>
            <div>
            <button onClick={() => {
                this.shareLink()
                this.show()
            }} className="accordion">Share Link</button>
            <div style={this.state.show} className="panel">
                <p id="link" style={show}></p>
                <p id="code" style={show}></p>
            </div>
            </div>
                {this.state.photos.length > 0 ? <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                /> : null}
          </div>
        );
    }
}

const nowshow = {
    display: "none"
}

const show = {
    display: "block",
    height: "100%",
    color: "#9358c4",
    wordWrap: "break-word", //text can wrap
    fontSize: "1.2rem"
}
