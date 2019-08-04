import React from 'react';
import './About.scss';
import { ReactComponent as MicIcon } from '../../images/podcastMic.svg';
import { useSpring, animated } from 'react-spring';

const About = () => {
    const fade = useSpring({from: {opacity:0}, opacity:1});

    return (
        <animated.div className="about-container" style={fade} >
            <h1 className="about-container-title">Why ZENCAST?</h1>
            <h3 className="about-container-summary">
                Zencast is the efforts of one self-taught developer who is currently speaking in the 3rd person. Hi, I'm Nate and congratulations
                on discovering this awesome podcasts web app! It's been a lot of work and although I've learned a lot, unfortunately I can't even afford to run
                this thing without your help; so please consider donating!
            </h3>
            <div className="about-container-bottom">
                <div className="about-container-card">
                    <div className="about-card-picture"><MicIcon></MicIcon></div>
                    <div className="about-card-title">1,000,000+ episodes</div>
                    <div className="about-card-border"></div>
                    <div className="about-card-description">
                        No, that's not a typo. Find over 1 million episodes belonging to over 600,000 podcasts and counting. The fun never ends!
                    </div>
                </div>
                <div className="about-container-card">
                    <div className="about-card-picture"></div>
                    <div className="about-card-title">Completely FREE</div>
                    <div className="about-card-border"></div>
                    <div className="about-card-description">
                        Sign up, or don't! Zencast is totally free no matter what you do. But donations do help :)
                    </div>
                </div>
                <div className="about-container-card">
                    <div className="about-card-picture"></div>
                    <div className="about-card-title">ZER0 Ads</div>
                    <div className="about-card-border"></div>
                    <div className="about-card-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora atque, illum voluptates ducimus harum 
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default About