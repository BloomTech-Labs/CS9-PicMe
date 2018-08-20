import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import selfieImages from './selfies-test-images';
import './css/PhotoBrowser.css';

export default class PhotosBrowser extends Component {
    render() {
        return(
            <div className="component-container">
            <div className="gallery-container">
            <h2> Check out these photos! </h2>
                <Gallery photos={PHOTO_SET} margin={12} />
            </div>
            </div>
        );
    }
}

const PHOTO_SET = [
    {
        src: selfieImages[0].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[1].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[2].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[3].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[4].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[5].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[6].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[7].url,
        width: 1,
        height:1
    },
    {
        src: selfieImages[8].url,
        width: 1,
        height:1
    },
]