import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';

const Search = (props) => {

    return (
        <div className="search-container">
            <h1 className="title">Podcasts matching: "{props.searchTerm}"</h1> 
            <div className="podcast-container"> {
                    props.podcasts.resultCount ?
                        props.podcasts.results.map(podcast => {
                            return <PodcastCard 
                                key={podcast.collectionId}
                                id={podcast.collectionId}
                                title={podcast.collectionName}
                                image={podcast.artworkUrl600}
                                publisher={podcast.artistName}
                                getEpisodes={props.getEpisodes}
                                margin={20}
                                />
                        }) : 'No results found. Try typing the full name.'
                    }
            </div>
        </div>
    )
}

export default Search;
