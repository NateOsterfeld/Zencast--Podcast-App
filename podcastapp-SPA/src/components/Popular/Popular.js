import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';
import './Popular.css';

const Popular = ({ podcasts, getEpisodes }) => {
    return (
        <div className="podcast-container">
            <h1 className="title">Popular</h1> {
                podcasts.map(podcast => {
                    return <PodcastCard 
                        key={podcast.id}
                        id={podcast.id}
                        title={podcast.name}
                        image={podcast.artworkUrl100}
                        publisher={podcast.artistName}
                        getEpisodes={getEpisodes}
                    />
                })
            }
        </div>
    )    
}

export default Popular;