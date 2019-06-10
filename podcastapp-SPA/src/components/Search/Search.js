import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';

const Search = (props) => {

    return (
        <div className="podcast-container">
            <h1 className="title">Search</h1> {
                props.podcasts.resultCount ?
                    props.podcasts.results.map(podcast => {
                        return <PodcastCard 
                            key={podcast.collectionId}
                            id={podcast.collectionId}
                            title={podcast.collectionName}
                            image={podcast.artworkUrl100}
                            publisher={podcast.artistName}
                            getEpisodes={props.getEpisodes}
                        />
                }) : 'No results found. Try typing the full name.'
            }
        </div>
    );
}

export default Search;