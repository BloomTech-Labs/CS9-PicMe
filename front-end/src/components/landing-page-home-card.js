import React from 'react';
import Tilt from 'react-tilt';
import './css/landing-page-home-card.css';

const LandingPageHomeCard = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 center" options={{ max : 50 }} style={{ height: 200, width: 200 }}>
                <div className="Tilt-inner pa2 bg-lightest-blue br3 shadow-2">
                    <h2> HOME </h2>
                    <p> 
                        Welcome to PicMe! Thank you for taking part in 
                        this amazing photo sharing experience. We hope you have as much 
                        fun using it, as we did creating it. Swipe through 
                        these cards to see what we do!
                    </p>
                </div>
            </Tilt>
        </div>
    );
}

export default LandingPageHomeCard;
