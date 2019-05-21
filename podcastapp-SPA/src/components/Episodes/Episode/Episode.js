import React from 'react';
import './Episode.css';
import '../Episodes.css';

const Episode = ({ postPlayBarObj, ogImage, description, duration, enclosure, image, link, pubDate, title }) => {
    //if loads slow, run "postplaybarobj function" inside playsound, and "sound.play" first
    // const sound = new Audio();
    // const playSound = (enclosureUrl) => {
    //     sound.src = enclosureUrl;
    //     sound.play();
    // }
    // console.log(enclosure); //length, type, url
    return (
        <tr>
            <td className="td1">
                <div className="level">
                    <div className="level-right">
                        <div className="level-item">
                            <span className="listen">
                                <span className="grey-text">
                                    <i className="far fa-check-circle"></i>
                                </span>
                            </span>
                        </div>
                        <div className="level">
                            <div className="ep-title">{title}</div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="td">{pubDate}</td>
            <td className="td">{duration}</td>
            <td className="td table-icon-container">
                <div className="table-icon">
                    <a 
                        onClick = {() => postPlayBarObj(ogImage, enclosure, title)}
                        data-audio={enclosure.url}>
                        <span><i class="far fa-play-circle"></i></span>
                    </a>
                </div>
            </td>
        </tr>
    )
}

export default Episode;