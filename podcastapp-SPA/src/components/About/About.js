import React from 'react';
import { useSpring, animated } from 'react-spring';

const About = () => {
    const fade = useSpring({from: {opacity:0}, opacity:1});

    return (
        <animated.div className="about-container" style={fade} >
            <h1 className="title">About</h1>
        </animated.div>
    )
}

export default About