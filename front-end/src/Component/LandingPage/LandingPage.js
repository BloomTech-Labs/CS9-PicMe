import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import LandingPageHomeCard from '../LandingPageHomeCard/LandingPageHomeCard';
import LandingPageAboutUsCard from '../LandingPageAboutUsCard/LandingPageAboutUsCard';
 
class LandingPage extends Component {
    constructor () {
        super();
        this.state = {};
    }

    onSlideClick = (event) => {
        console.log('clicked');
    }

    render() {
        const params = {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }
          };

        return (
            <article className="br3 bg-transparent ba b--none mv4 w-200 w-200-m w-200-l mt6 mw200  center text-center">
                <Swiper {...params}>
                    <div className="slider-slide" onClick={this.onSlideClick}>
                    <LandingPageHomeCard />
                    </div>
                    <div className="slider-slide" onClick={this.onSlideClick}>
                    <LandingPageAboutUsCard />
                    </div>
                    <div className="slider-slide" onClick={this.onSlideClick}>
                    </div>
                    <div className="slider-slide" onClick={this.onSlideClick}>
                    </div>
                    <div className="slider-slide" onClick={this.onSlideClick}>
                    </div>
                </Swiper>
            </article>
        );
    }
}
 
export default LandingPage;