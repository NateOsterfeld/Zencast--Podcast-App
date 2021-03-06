import React, { useState, useEffect } from 'react';
import Episode from './Episode/Episode';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Episodes.css';
import useSuspenseFetchEpisodes from './useSuspenseFetchEpisodes';
//mainDescription: response[0].mainDescription, episodes: response, website: response[0].website


const Episodes = ({ episodesObj, postPlayBarObj, hasPlayed }) => {
    const episodes = useSuspenseFetchEpisodes(episodesObj.id);

    let [count, setCount] = useState(30);
    let [website, setWebsite] = useState();
    let [description, setDescription] = useState();
    let start = 0;
    const initEpisodes = [];

    for (let i = start; i < count; i++) {
        if (episodes[i]) {
            initEpisodes.push(episodes[i]);
        }
    }

    const loadMore = () => {
        start = count;
        setCount(count += 30);

        for (let i = start; i < count; i++) {
            if (episodes[i]) {

                initEpisodes.push(episodes[i]);
            }
        }
    }

    const fixInnerText = () => {
        episodes[0].mainDescription &&
            episodes[0].mainDescription.toString().trim().substring(0, 3) === '<p>'
            ? setDescription(episodes[0].mainDescription.toString().trim().substring(3, episodes[0].mainDescription.toString().trim().length - 4))
            : setDescription(episodes[0].mainDescription)

    }
    useEffect(() => fixInnerText())
    useEffect(() => { episodes[0].website && setWebsite(episodes[0].website) }, [episodes])

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
                            threshold={episodes.length}
                            hasMore={true}

                        >
                            {
                                initEpisodes.map((episodes, i) => (
                                    <Episode
                                        key={i}
                                        id={i}
                                        description={episodes.description}
                                        duration={episodes.duration}
                                        enclosure={episodes.enclosure}
                                        image={episodes.image}
                                        link={episodes.link}
                                        pubDate={episodes.pubDate}
                                        title={episodes.title}
                                        postPlayBarObj={postPlayBarObj}
                                        ogImage={episodesObj.image}
                                        publisher={episodesObj.publisher}
                                        hasPlayed={hasPlayed}
                                    />
                                ))
                            }
                        </InfiniteScroll>

                    </div>
                </div>
            </div>
    )
}

// description, duration, enclosure, image, link, pubDate, title

export default Episodes
