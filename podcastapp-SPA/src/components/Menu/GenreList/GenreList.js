import React from 'react';
import Genre from './Genre/Genre';

const GenreList = ({ podcasts }) => {
    console.log('GenreList', podcasts);
    return (
        <div className="podcast-container">
            {
                podcasts.map(podcast => {
                    return <PodcastCard 
                        key={podcast.id}
                        id={podcast.id}
                        title={podcast.name}
                        image={podcast.artworkUrl100}
                        publisher={podcast.artistName}
                    />
                })
            }
        </div>
    )    
}

export default GenreList;