import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import axios from "axios";
import SelectedImage from "./SelectedImage";

const PHOTO_SET = [

]


export default class friendsUploads extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: PHOTO_SET,
            id: "",
            show: nowshow
        };
        // select photo binding
        this.selectPhoto = this.selectPhoto.bind(this);
        // select binding
        this.toggleSelect = this.toggleSelect.bind(this);
        // add to collection binding
        // download selected
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
        let id = window.location.href.split("/")[5]
        axios.get(`${process.env.REACT_APP_API}/friend/${id}`)
        .then(response => {
            response.data.forEach(image => {
                PHOTO_SET.push({
                    src: image,
                    width: 1,
                    height: .7
                })

                this.setState({
                    photos: PHOTO_SET
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return(
            <div className="component-wrapper">
                <h1> Friends photo uploads: </h1>

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
    display: "block"
}