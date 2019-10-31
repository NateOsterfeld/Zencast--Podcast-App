import React, { useState, useEffect } from 'react';
import PodcastCard from '../../PodcastCard/PodcastCard';
import { useSpring, a } from 'react-spring';

// event handling with spring? onClick={function that will set a style prop from spring on the element}
const TopPodcasts = ({ podcasts, getEpisodes, direction, loading }) => {
    const fade = useSpring({from:{opacity: 0}, opacity: 1});
    const normal = useSpring({ from: { opacity: 1 }, opacity: 1 });
    
    const [directionStyle, setDirectionStyle] = useState();

    const right = useSpring({from:{transform: 'translateX(0px)'}, transform: 'translateX(-900px)'});
    const left = useSpring({from:{transform: 'translateX(-900px)'}, transform: 'translateX(0px)'});

    useEffect(() => {
        direction === 'top-right' && setDirectionStyle(right);
        direction === 'top-left' && setDirectionStyle(left);
    }, [direction])
            
    
    return (
        <a.div className="selection-component" style={loading ? normal : fade}>
        	<a.div className="componentCarousel" style={directionStyle} > {
            podcasts.map((podcast, i) => {
                if (i < 10)
                    return <PodcastCard
                        key={podcast.id}
                        id={podcast.id}
                        title={podcast.name}
                        image={podcast.artworkUrl100}
                        publisher={podcast.artistName}
                        getEpisodes={getEpisodes}
                        margin={10}
                    />
            })
        }
            </a.div>
        </a.div>
    )
}

export default TopPodcasts;
