import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';
import './CuratedPodcasts.scss';
import { useSpring, animated } from 'react-spring';


const CuratedPodcasts = ({ curatedListObj, getEpisodes }) => {
    const fade = useSpring({from: {opacity: 0}, opacity: 1});
    return (
        <animated.div className="podcast-container" style={fade}>
            <h1 className="title">{curatedListObj.title}</h1> {
                curatedListObj.podcasts.map(podcast => {
                    return <PodcastCard 
                                key={podcast.id}
                                id={podcast.itunes_id}
                                title={podcast.title}
                                image={podcast.thumbnail}
                                publisher={podcast.publisher}
                                website={podcast.website}
                                getEpisodes={getEpisodes}
                                margin={20}
                    />
                })
            }
        </animated.div>
    )
}

export default CuratedPodcasts;