import React from 'react';
import Episode from './Episode/Episode';
import './Episodes.css';

const Episodes = ({ episodesObj, postPlayBarObj, hasPlayed }) => {

    return (
        <div className="episodes-case">
            <div className="top-container">
                <div className="media-container">
                    <div className="media-left">
                        <img className="logo" src={episodesObj.image} alt={episodesObj.title}></img>
                    </div>
                    <div className="media-center">
                        <h1 className="title">{episodesObj.title}</h1>
                        <h2 className="publisher">{episodesObj.publisher}</h2>
                        <p className="description">{episodesObj.mainDescription}</p>

                    </div>
                    <div className="media-right">
                        <button type="button" className="btn btn-secondary subscribe">
                        <i className="fas fa-plus"></i>
                        Subscribe</button>
                    </div>
                </div>
            </div>
            <table className="episodes-container">
                <thead className="table-head">
                    <tr>
                        <th>Episode Name</th>
                        <th className="order">
                            <p className="released">Released<i className="fas fa-sort-down"></i></p>
                        </th>
                        <th className="duration">Duration</th>
                        <th></th>
                    </tr>
                </thead>
                    <tbody>
                    {
                        episodesObj.episodes.map((episode, i) => {
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
                    </tbody>
                
            </table>
        </div>
    )
}

// description, duration, enclosure, image, link, pubDate, title

export default Episodes