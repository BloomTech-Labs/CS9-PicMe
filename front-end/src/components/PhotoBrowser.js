import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import selfieImages from './selfies-test-images';
import './css/PhotoBrowser.css';
import SelectedImage from "./SelectedImage";
import { Modal, Button } from 'semantic-ui-react';



const PHOTO_SET = [
    {
        src: selfieImages[0].url,
        width: 1,
        height:1,
        tags: [
            {
              id: "1",
              text: selfieImages[0].users
            },
          ]
    },
    {
        src: selfieImages[1].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "2",
                text: selfieImages[1].users
              },
          ]
    },
    {
        src: selfieImages[2].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "3",
                text: toString(selfieImages[2].users)
              },
          ]
    },
    {
        src: selfieImages[3].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "4",
                text: selfieImages[3].users
              },
          ]
    },
    {
        src: selfieImages[4].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "5",
                text: selfieImages[4].users
              },
          ]
    },
    {
        src: selfieImages[5].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "6",
                text: selfieImages[5].users
              },
          ]
    },
    {
        src: selfieImages[6].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "7",
                text: selfieImages[6].users
              },
          ]
    },
    {
        src: selfieImages[7].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "8",
                text: selfieImages[7].users
              },
          ]
    },
    {
        src: selfieImages[8].url,
        width: 1,
        height:1,
        tags: [
            {
                id: "9",
                text: selfieImages[8].users
              },
          ]
    },
]

export default class PhotosBrowser extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: PHOTO_SET,
            selectAll: false
        };
            // select photo binding
            this.selectPhoto = this.selectPhoto.bind(this);
            // select binding
            this.toggleSelect = this.toggleSelect.bind(this);
            // add to collection binding
            this.toggleSubmit = this.toggleSubmit.bind(this);
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
    toggleSubmit(event) {
        this.handleOpen("Selected Photos have been added to your collection!");
    }

    componentWillMount(tags) {
        this.setState({ tags: PHOTO_SET.tags});
        console.log(this.state);
    }

    handleOpen = desc => this.setState({ modalOpen: true, modalDescription: desc })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return(
            <div className="component-wrapper">
                <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' style={modalStyle}>
                    <Modal.Content>
                        <Modal.Description>
                            <h4>{this.state.modalDescription}</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Actions>
                </Modal>
                <h1> Check out these photos! </h1>
                <p>
                <button className="toggle-select" onClick={this.toggleSelect}>
                    toggle select all
                </button>
                <button className="add-to-collection" onClick={this.toggleSubmit}>
                    Add selected photos to collection
                </button>
                </p>
                <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                />
            </div>
        );
    }
}