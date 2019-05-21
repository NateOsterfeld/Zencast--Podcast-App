import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';

const GenrePodcasts = ({ genrePodcasts, getEpisodes }) => {
    return (
        <div className="podcast-container">
            <h1 className="title">{genrePodcasts.name}</h1>
            {
                genrePodcasts.podcasts.map(genrePodcast => {
                    return <PodcastCard 
                        key={genrePodcast.id}
                        id={genrePodcast.collectionId}
                        title={genrePodcast.collectionName}
                        image={genrePodcast.artworkUrl600}
                        publisher={genrePodcast.artistName}
                        feedUrl={genrePodcast.feedUrl}
                        trackCount={genrePodcast.trackCount}
                        genreIds={genrePodcast.genreIds}
                        genres={genrePodcast.genres}
                        getEpisodes={getEpisodes}
                    />
                })
            }
        </div>
    )    
}

export default GenrePodcasts;