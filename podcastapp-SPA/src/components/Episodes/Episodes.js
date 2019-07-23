import React, { useState, useEffect } from 'react';
import Episode from './Episode/Episode';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Episodes.css';

const Episodes = ({ episodesObj, postPlayBarObj, hasPlayed }) => {
    let [count, setCount] = useState(30);
    let [website, setWebsite] = useState();
    let [description, setDescription] = useState();
    let start = 0;
    const initEpisodes = [];

    for (let i = start; i < count; i++) {
        if (episodesObj.episodes[i]){
            initEpisodes.push(episodesObj.episodes[i]);
        }
    }

    const loadMore = () => {
        start = count;
        setCount(count+=30);
            
        for (let i = start; i < count; i++) {
            if (episodesObj.episodes[i]){

                initEpisodes.push(episodesObj.episodes[i]);
            }
        }
    }

    const fixInnerText = () => {
        episodesObj.mainDescription &&
            episodesObj.mainDescription.toString().trim().substring(0,3) === '<p>'
                ? setDescription(episodesObj.mainDescription.toString().trim().substring(3, episodesObj.mainDescription.toString().trim().length - 4))
                : setDescription(episodesObj.mainDescription)
        
    }
    useEffect(() => fixInnerText())
    useEffect(() => {episodesObj.website && setWebsite(episodesObj.website.substring(0, episodesObj.website.indexOf('?')))}, episodesObj.website)
    
    return (
        <div className="episodes-case">
            <div className="top-container">
                <div className="media-container">
                    <div className="media-left">
                        <a href={website} rel="noopener noreferrer" target="_blank" >
                            <img className="logo" src={episodesObj.image} alt={episodesObj.title}></img>
                        </a>
                    </div>
                    <div className="media-center">
                        <h1 className="title">{episodesObj.title}</h1>
                        <h2 className="publisher">{episodesObj.publisher}</h2>
                        <p className="description">{description}</p>
                    </div>
                    <div className="media-right">
                        <button type="button" className="btn btn-secondary subscribe">
                        <i className="fas fa-plus"></i>
                        Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="episodes-container">
                <div className="table-head">               
                        <div className="table-name">Episode Name</div>
                        <div className="order">
                            <p className="released">Released<i className="fas fa-sort-down"></i></p>
                        </div>
                        <div className="duration">Duration</div>
                        <div className="table-play"></div>
                </div>
                    <div>
                    
                        <InfiniteScroll
                            dataLength={initEpisodes.length}
                            next={() => loadMore()}
                            threshold={episodesObj.episodes.length}
                            hasMore={true}
                            
                        >
                        {
                            initEpisodes.map((episode, i) => {
                                return <Episode 
                                    key={i}
                                    id={i}
                                    description={episode.description}
                                    duration={episode.duration}
                                    enclosure={episode.enclosure}
                                    image={episode.image}
                                    link={episode.link}
                                    pubDate={episode.pubDate}
                                    title={episode.title}
                                    postPlayBarObj={postPlayBarObj}
                                    ogImage={episodesObj.image}
                                    publisher={episodesObj.publisher}
                                    hasPlayed={hasPlayed}
                                />
                            })
                        }
                        </InfiniteScroll>
                    
                    </div>
                
            </div>
        </div>
    )
}

// description, duration, enclosure, image, link, pubDate, title

export default Episodes