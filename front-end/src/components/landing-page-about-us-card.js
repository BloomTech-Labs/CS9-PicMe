import React from 'react';
import Tilt from 'react-tilt';
import './css/landing-page-about-us-card.css';

const LandingPageAboutUsCard = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 center" options={{ max : 50 }} style={{ height: 200, width: 200 }}>
                <div className="Tilt-inner pa2 bg-lightest-blue br3 shadow-2">
                    <h2> ABOUT US </h2>
                    <p> 
                        PicMe is a social media, image-sharing platform. 
                        Upload your images, tag your friends, add photos 
                        to your collection, and see share your experiences with the world!
                    </p>
                </div>
            </Tilt>
        </div>
    );
}

export default LandingPageAboutUsCard;
