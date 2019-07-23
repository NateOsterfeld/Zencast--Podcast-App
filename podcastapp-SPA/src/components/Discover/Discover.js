import React from 'react';
import './Discover.scss';
import TopPodcasts from './TopPodcasts/TopPodcasts';
import ExploreGenre from './ExploreGenre/ExploreGenre';
import CuratedLists from './CuratedLists/CuratedLists';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Discover = (props) => {
    const { getEpisodes, getGenre, topPodcasts, genre, curatedLists, getListPodcasts } = props;
    const [topSlideDirection, setTopSlideDirection] = useState();
    const [expSlideDirection, setExpSlideDirection] = useState();
    const [clSlideDirection, setClSlideDirection] = useState();
    const fade = useSpring({from:{opacity: 0}, opacity: 1})

    const handleSlide = (e) => {
        const direction = e.target.dataset.slide;
        
        switch(direction) {
            case 'top-right':
                setTopSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollLeft-top').classList.remove('transparent');
                break;
            case 'top-left':
                setTopSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollRight-top').classList.remove('transparent')
                break;
            
            case 'exp-right':
                setExpSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollLeft-exp').classList.remove('transparent');
                break;
            case 'exp-left':
                setExpSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollRight-exp').classList.remove('transparent')
                break;

            case 'cl-right':
                setClSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollLeft-cl').classList.remove('transparent');
                break;
            case 'cl-left':
                setClSlideDirection(direction);
                e.target.parentNode.classList.add('transparent');
                document.querySelector('.scrollRight-cl').classList.remove('transparent')
                break;
        }
    }
    
    return (
        <animated.div className="discover-container" style={fade}>

            <h1 className="mb2 title">  Discover
            </h1>
            <h4 className="selection-container-title">  Explore: {genre.name}
                <Link to={`/genres/${genre.name.toLowerCase()}`}
                    onClick = { (e) => getGenre(genre.id, genre.name, e, false) }
                    className="selection-anchor">   more
                    <span className="fas fa-chevron-right" attr="icon">
                    </span>
                </Link>
            </h4>
            <div className="selection-container">
                <div className="scrollLeft scrollLeft-exp transparent">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollLeft-icon fas fa-chevron-left" 
                        data-slide="exp-left">
                    </span>
                </div>
                <div className="scrollRight scrollRight-exp">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollRight-icon fas fa-chevron-right"
                        data-slide="exp-right">
                    </span>
                </div>
                <ExploreGenre podcasts={genre.podcasts} getEpisodes={getEpisodes} direction={expSlideDirection} />                
            </div>


            <h4 className="selection-container-title">  Curated Lists
                <a href="" className="selection-anchor">    more
                    <span className="fas fa-chevron-right" attr="icon">
                    </span>
                </a>
            </h4>
            <div className="selection-container">
                <div className="scrollLeft scrollLeft-cl transparent">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollLeft-icon fas fa-chevron-left" 
                        data-slide="cl-left">
                    </span>
                </div>
                <div className="scrollRight scrollRight-cl">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollRight-icon fas fa-chevron-right" 
                        data-slide="cl-right">
                    </span>
                </div>
                <CuratedLists curatedLists={curatedLists} getListPodcasts={getListPodcasts} direction={clSlideDirection} />                
            </div>

            

            <h4 className="selection-container-title">  Top Podcasts
                <a href="" className="selection-anchor">    more
                    <span className="fas fa-chevron-right" 
                            attr="icon">
                    </span>
                </a>
            </h4>  
            <div className="selection-container">
                <div className="scrollLeft scrollLeft-top transparent">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollLeft-icon fas fa-chevron-left" 
                        data-slide="top-left"></span>
                </div>
                <div className="scrollRight scrollRight-top">
                    <span   onClick = { (e) => handleSlide(e) } 
                        className="scrollRight-icon fas fa-chevron-right" 
                        data-slide="top-right"></span>
                </div>
                <TopPodcasts getEpisodes={getEpisodes} podcasts={topPodcasts} direction={topSlideDirection} />
            </div>

        </animated.div>
    )
}

export default Discover;