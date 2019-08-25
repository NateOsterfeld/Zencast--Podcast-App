import React, { useState, useEffect } from 'react';
import PodcastCard from '../../PodcastCard/PodcastCard';
import { useSpring, a } from 'react-spring';

const ExploreGenre = ({ podcasts, getEpisodes, direction, loading }) => {
    const fade = useSpring({from:{opacity: 0}, opacity: 1});
    const normal = useSpring({from:{opacity: 1}, opacity: 1});

    const [directionStyle, setDirectionStyle] = useState();

    const right = useSpring({from:{transform: 'translateX(0px)'}, transform: 'translateX(-900px)'});
    const left = useSpring({from:{transform: 'translateX(-900px)'}, transform: 'translateX(0px)'});
    
    useEffect(() => {
        direction === 'exp-right' && setDirectionStyle(right);
        direction === 'exp-left' && setDirectionStyle(left);
    })

    return (
        <a.div className="selection-component" style={loading ? normal : fade} >
        	<a.div className="componentCarousel" style={directionStyle}> {
            podcasts.map((podcast, i) => {
                if (i < 10)
                    return <PodcastCard
                        key={podcast.collectionId}
                        id={podcast.collectionId}
                        title={podcast.artistName}
                        image={podcast.artworkUrl600}
                        publisher={podcast.collectionName}
                        getEpisodes={getEpisodes}
                        margin={10}
                    />
            })
        }
            </a.div>
        </a.div>
    )
}

export default ExploreGenre;