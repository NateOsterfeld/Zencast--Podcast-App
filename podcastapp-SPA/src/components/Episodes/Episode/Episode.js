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
        audio.src = enclosure.url;
        audio.play();

        if (this.refPlay) {
            this.setState({ playBtn: this.refPlay.className });
            this.props.hasPlayed(this.refPlay);
        } 

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
                                <div className="ep-title">{title}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="td ep-date">{pubDate}</div>
                <div className="td ep-duration">{duration}</div>
                <div className="td table-icon-container">
                    <div className="table-icon">
                        <a
                            className='pause' 
                            ref = { this.setRef }
                            onClick = {() => this.playSound(enclosure)}>
                            <span><i class="far fa-play-circle"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Episode;