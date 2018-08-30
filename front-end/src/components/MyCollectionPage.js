import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import selfieImages from './selfies-test-images';
import './css/MyCollectionPage.css';
import SelectedImage from "./SelectedImage";
import axios from 'axios';
import { Modal, Button } from 'semantic-ui-react';

export default class MyCollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: [],
            selectAll: false
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

  async componentWillMount() {
    let photos = (await axios.get(`${process.env.REACT_APP_API}/collection/${localStorage.email}`)).data;
    if (photos.length > 0) {
      photos = photos.map( photo => {
        return {
          src: photo.url,
          width: 1,
          height: 1,
          id: photo.id,
          ownerid: photo.uploaded_image_user_id
        }
      });
    }
    this.setState({ photos: photos });
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
        this.handleOpen("Selected Photos have been removed from your collection");
    }

    toggleDownloadSelected(event, obj, index) {
        this.handleOpen("Thanks for downloading your selected images. The credits have been removed from your account.");
    }

    handleOpen = desc => this.setState({ modalOpen: true, modalDescription: desc })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const modalStyle = {
            margin: 'auto',
            marginTop: '50% - 80px',
            height: '160px'
        };
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
            <div className="header-container">
                    <h1 className="header-title"> Your photo collection </h1>
                <div className="button-container">
                    <p>
                    <button className="toggle-select" onClick={this.toggleSelect}>
                        toggle select all images
                    </button>
                    <button className="toggle-download-images" onClick={this.toggleDownloadSelected}>
                        Download selected images!
                    </button>
                    <button className="remove-from-your-collection" onClick={this.toggleSubmit}>
                        Remove selected images
                    </button>
                    </p>
                </div>
            </div>
      { this.state.photos.length > 0 ? 
            <div className="gallery-container">
            <Gallery
              photos={this.state.photos}
              onClick={this.selectPhoto}
              ImageComponent={SelectedImage}
              direction={"column"}
              margin={40}
            />
            </div> : null }
          </div>
        );
    }
}
