import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';

const Popular = ({ podcasts }) => {
            console.log('thisiswhatwewant', podcasts);
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

export default Popular;