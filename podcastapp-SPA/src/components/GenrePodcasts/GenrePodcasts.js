import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';

const GenrePodcasts = ({ genrePodcasts }) => {
    console.log('thisiswhatwewant', genrePodcasts);
    return (
        <div className="podcast-container">
            <h1 className="title">{genrePodcasts.name}</h1>
            {
                genrePodcasts.podcasts.map(genrePodcasts => {
                    return <PodcastCard 
                        key={genrePodcasts.id}
                        id={genrePodcasts.id}
                        title={genrePodcasts.name}
                        image={genrePodcasts.artworkUrl600}
                        publisher={genrePodcasts.artistName}
                    />
                })
            }
        </div>
    )    
}

export default GenrePodcasts;