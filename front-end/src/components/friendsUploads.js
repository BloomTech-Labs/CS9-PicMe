import React, {Component} from 'react';
import { Button, Form, Grid, Header, Message, Segment, Modal } from 'semantic-ui-react'
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
            show: nowshow,
            selectedImageIds: []
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
        let selectedImageIds = this.state.selectedImageIds;
        photos[obj.index].selected = !photos[obj.index].selected;
        if (photos[obj.index].selected) {
          selectedImageIds.push(photos[obj.index].id)
        } else {
          selectedImageIds = selectedImageIds.filter( id => id !== photos[obj.index].id )
        }
          this.setState({ photos: photos, selectedImageIds: selectedImageIds });
    }

    handleButtonClick = async () => {
      const payload = {
        imageIds: this.state.selectedImageIds,
        email: localStorage.email
      }

      const response = await axios.post(`${process.env.REACT_APP_API}/add-images-to-collection`, payload);
      const credits = response.data.credits;

      console.log(response)
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
        //Grab the user id from shareable link
        let id = window.location.href.split("/")[5]
        //pass the id onto our route in order to fetch images
        axios.get(`${process.env.REACT_APP_API}/friend/${id}`)
        .then(response => {
            response.data.forEach(image => {
                PHOTO_SET.push({
                    src: image.url,
                    id: image.id,
                    width: 1,
                    height: .7
                })
                //Sets our images in an object as specified by Gallery docs
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
          <div>
            <Button onClick={this.handleButtonClick} color='blue' size='large'>Add Selected Photos to My Collection</Button>
            <br />
            <br />
            <div className="component-wrapper">
                <h1> Friends photo uploads: </h1>

                {this.state.photos.length > 0 ? <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                /> : null}
            </div>
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
