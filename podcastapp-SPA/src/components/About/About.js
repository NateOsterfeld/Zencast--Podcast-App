import React from 'react';
import './About.scss';
import { ReactComponent as FreeSVG } from '../../images/FreeSVG.svg';
import { ReactComponent as MicSVG } from '../../images/MicSVG.svg';
import { ReactComponent as NoAdsSVG } from '../../images/NoAdsSVG.svg';
import { useSpring, animated } from 'react-spring';

const About = () => {
    const fade = useSpring({from: {opacity:0}, opacity:1});

    const twinkleAnimation = (e) => {
            const flares = e.target.querySelectorAll('[class$="grouped"]');
            flares.forEach(flare => {
                flare.style.animationDelay = Math.random() + 's';
                let duration = Math.random() > .5 ? 1 : .5;
                flare.style.animationDuration = duration + 's';
            })
    }


    return (
        <animated.div className="about-container" style={fade} >
            <h1 className="about-container-title">Why ZENCAST?</h1>
            <h3 className="about-container-summary">
                Zencast is the efforts of one self-taught developer who is currently speaking in the 3rd person. Hi, I'm Nate and congratulations
                on discovering this awesome podcasts web app! It's been a lot of work and although I've learned a lot, unfortunately I can't even afford to run
                this thing without your help; so please consider donating and spread the word!
            </h3>
            <div className="about-container-bottom">
                <div className="about-container-card" onMouseEnter={(e) => twinkleAnimation(e)}>
                    <div className="about-card-picture"><MicSVG></MicSVG></div>
                    <div className="about-card-title">30 MILLION Episodes</div>
                    <div className="about-card-border" data-attr="about-card-border-1"></div>
                    <div className="about-card-description">
                        No, that's not a typo. Find over 1 million episodes belonging to over 600,000 podcasts and counting. The fun never ends!
                    </div>
                </div>
                <div className="about-container-card" onMouseEnter={(e) => twinkleAnimation(e)}>
                    <div className="about-card-picture"><FreeSVG></FreeSVG></div>
                    <div className="about-card-title">Completely FREE</div>
                    <div className="about-card-border" data-attr="about-card-border-2"></div>
                    <div className="about-card-description">
                        Sign up, or don't! Zencast is totally free no matter what you do. But donations do help :)
                    </div>
                </div>
                <div className="about-container-card" onMouseEnter={(e) => twinkleAnimation(e)}>
                    <div className="about-card-picture"><NoAdsSVG></NoAdsSVG></div>
                    <div className="about-card-title">ZER0 Ads</div>
                    <div className="about-card-border" data-attr="about-card-border-3"></div>
                    <div className="about-card-description">
                        Zero, that's right, ZERO ADS!  Let's keep Zencast reminiscent of it's name, clean and peaceful.
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default About