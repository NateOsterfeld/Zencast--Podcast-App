import React from 'react';
import './Episode.css';
import '../Episodes.css';

class Episode extends React.Component {
    constructor(props) {
        super(props);
        this.playSound = this.playSound.bind(this);

        this.state = {
            hasPlayed: '',
            playBtn: 'pause'
        }
            this.refPlay = null;

            this.setRef = (el) => {
            this.refPlay = el;
        }
    }

    playSound = (enclosure) => {
        const audio = new Audio();

        //verify podcast is playing/ready to play by sending to app.js, setting state there and adding to prop of Playbar and only accept controls input if "hasPlay" aka refPlay exists
        this.props.postPlayBarObj(audio, this.props.ogImage, enclosure, this.props.title, this.refPlay, this.props.publisher, this.props.pubDate);
    }


    render() {
        const { postPlayBarObj, publisher, ogImage, description, duration, enclosure, image, link, pubDate, title } = this.props;
        
        return (
            <div className="episode-container">
                <div className="td1 ep-name">
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
                                <div className="ep-title">{title.length > 50 ? title.substring(0, 100) + '...' : title}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="td ep-date">{pubDate.substring(0, pubDate.length-14)}</div>
                <div className="td ep-duration">{duration}</div>
                <div className="td table-icon-container">
                    <div className="table-icon">
                        <a
                            className='pause' 
                            ref = { this.setRef }
                            onClick = {() => this.playSound(enclosure)}>
                            <span><i className="far fa-play-circle"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Episode;