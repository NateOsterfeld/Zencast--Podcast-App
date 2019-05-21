import React from 'react';
import './PlayBar.scss';

class PlayBar extends React.Component {
    constructor(props) { //have a function in "Episode.js" that determines true/false if an episode has been clicked/played
        super(props); //audio, image, enclosure, title
        // this.onClickPlayButton = this.onClickPlayButton.bind(this);
        // this.onClickSeekBarOuter = this.onClickSeekBarOuter.bind(this);
        // this.onClickVolume = this.onClickVolume.bind(this);
        this._refPlayButton = React.createRef();
        this._refSeekBarInner = React.createRef();
        this._refSeekBarOuter = React.createRef();
        this._refTimingEnd = React.createRef();
        this._refImage = React.createRef();
        this._refVolumeInner = React.createRef();
        this._refVolumeOuter = React.createRef();

        this.state = {
            playButton: 'play',
            duration: 0,
            current: 0,
            hasPlayed: 'has-not',
            finalPlay: 'play',
            playCounter: 0
            
            
        }

    }
    
    //pass method in that will change the state

    
    //remember getsnapshot updates before component updates?
    updateSeekBar = () => {
        let seekBarPercentage = this.getPercentage(this.props.playBarObj.audio.currentTime.toFixed(2), this.props.playBarObj.audio.duration.toFixed(2));
        console.log(this.props.playBarObj.audio.currentTime, this.state.duration);
        // console.log(seekBarPercentage);
        this._refSeekBarInner.current.style.width = seekBarPercentage + '%';
        let convertedTime = this.convertToSeconds(this.props.playBarObj.audio.currentTime);
        this.setState({ current: convertedTime });
    }

    getPercentage = (currentValue, totalLength) => {
        let calcPercentage = (currentValue/totalLength)*100;
        return parseFloat(calcPercentage.toString());
    }

    convertToSeconds = (currentTime) => {
        let seconds = currentTime % 60;
        let foo = currentTime - seconds;
        let minutes = foo / 60;
        if(seconds < 9){
            seconds = 0 + seconds;
            return minutes + ":0" + seconds.toFixed(0);
        }
        return minutes + ":" + seconds.toFixed(0);
    }

    convertToSecsEnd = (duration) => {
        let seconds = duration % 60;
        let foo = duration - seconds;
        let minutes = foo / 60;
        return minutes + ":" + seconds.toFixed(0);
    }
    
    onClickPlayButton = () => {
        this.state.playCounter++;
        
        if (this._refPlayButton.current.className === 'play') {
            this.setState({ finalPlay: 'pause'});
            let convertedEndTime = this.convertToSecsEnd(this.props.playBarObj.audio.duration);
            this.setState({ duration: convertedEndTime })
            this._refImage.current.className = 'animateImage';
            this._refImage.current.nextSibling.style.color = 'white';
            console.log(this._refImage);
            this.props.playBarObj.audio.play();
            let interval = setInterval(() => {
                if (!this.props.playBarObj.audio.paused) {
                    this.updateSeekBar();
                }
            }, 250);
        }
        else if (this._refPlayButton.current.className === 'pause') {
            let convertedEndTime = this.convertToSecsEnd(this.props.playBarObj.audio.duration);
            this._refTimingEnd.current.innerText = convertedEndTime;
            let interval = setInterval(() => {
                if (!this.props.playBarObj.audio.paused) {
                    this.updateSeekBar();
                }
            }, 250);
            this.setState({ finalPlay: 'play'});
            this._refImage.current.className = '';
            this.props.playBarObj.audio.pause();
        }
        let interval = setInterval(() => {
            if (!this.props.playBarObj.audio.paused) {
                this.updateSeekBar();
            }
        }, 250);
    }
            
    

    onClickSeekBarOuter = (e) => {
        if (!this.props.playBarObj.audio.ended && this.state.duration !== 0) {
            let seekPosition = e.pageX - this._refSeekBarOuter.current.offsetLeft;
            if (seekPosition >= 0 && seekPosition < this._refSeekBarOuter.current.offsetLeft + e.pageX) {
                let newCurrentTime = (seekPosition*this.props.playBarObj.audio.duration.toFixed(2)) / this._refSeekBarOuter.current.offsetWidth;
                console.log('newcc',newCurrentTime);
                console.log('seekpos',seekPosition);
                console.log('dur',this.state.duration);
                console.log('refseek',this._refSeekBarOuter.current.offsetWidth);
                this.props.playBarObj.audio.currentTime = newCurrentTime;
            }
        }
    }
 //run method that runs onclick
    onClickVolume = (e) => {
        let volumePosition = e.pageX - this._refVolumeOuter.current.offsetLeft;
        let audioVolume = volumePosition / this._refVolumeOuter.current.offsetWidth;
        
        if (audioVolume >= 0 && audioVolume <= 1) {
            this.props.playBarObj.audio.volume = audioVolume;
            this._refVolumeInner.current.style.width = audioVolume*100 + '%';
            // this._refVolumeInner.current.classList.add('vol-animate');
            // setInterval(() => {
            //     this._refVolumeInner.current.classList.remove('vol-animate');
            // }, 1500);
        }
    }

        
        
    render() {
        const { playBarObj } = this.props;
        return (
            <div className="level is-mobile">
                <div className="level-left" id="mobile-player">
                    <div className="level-item" href="">
                        <img 
                            ref = { this._refImage }    
                            id="playing-art" src={playBarObj.image} />
                            <div className="art-placeholder">
                                <i className="fas fa-headphones">
    
                                </i>
                            </div>
                        <div className="player-loading">
                            <div className="button is-link is-loading is-large is-rounded">
    
                            </div>
                        </div>
                    </div>
                    <div className="level-item" id="player-controls">
                        <div className="field has-addons ma">
                            <div className="control">
                                <button className="button is-large btn">
                                    <span>
                                        <i className="fas fa-backward">
    
                                        </i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button                                     
                                        ref = { this._refPlayButton }
                                        onClick = { () => this.onClickPlayButton() }
                                        className={(this.props.hasPlayed.className === 'pause' && this.state.playCounter === 0) ? 'pause' : this.state.finalPlay} id="play-btn">
                                    <span className="icon is-medium is-marginless" id="play-icon">
                                        <i className="fas fa-play"></i>
                                        <i className="fas fa-pause"></i>
                                    </span>
                                    
                                        
                                   
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-large btn btn-for">
                                    <span>
                                        <i className="fas fa-forward">
    
                                        </i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="level-item is-hidden-mobile">
                    <div className="has-text-centered" id="player-center">
                        <p className="player-info is-size-6">
                            <a data-target="player.episode" href="/podcasts/360084272?episode_id=http://blog.joerogan.net/?p=1810">
                                {playBarObj.title.length > 0 ? playBarObj.title : 'Go ahead...'}
                            </a>
                        </p>
                        <p className="player-info">
                            <a data-target="player.podcast" href="/podcasts/360084272">
                                {playBarObj.publisher.length > 0 ? playBarObj.publisher + '-' : ''} 
                                {playBarObj.pubdate.length > 0 ? playBarObj.pubdate : 'play something already!'}
                            </a>
                        </p>
                        <div className="seekBar">
                            <span 
                                ref = { this._refSeekBarOuter }
                                onClick = { (e) => this.onClickSeekBarOuter(e) }
                                className="outer">
                                <span 
                                    ref = { this._refSeekBarInner }
                                    className="inner"></span>
                            </span>
                        </div>
                        <div className="player-time" id="timing" data-target="player.time">
                            <div className="timing-start">{this.state.current} / </div>
                            <div 
                                ref = { this._refTimingEnd }
                                className="timing-end"> {this.state.duration}</div>
                        </div>
                    </div>
                </div>
                <div className="level-right is-hidden-touch ma">
                    <div className="level-item">
                        <div className="select is-rounded is-small">
                            <select data-action="player#setSpeed" data-target="player.speed" type="text">
                                <option value="0.5">x0.5</option>
                                <option value="0.75">x0.75</option>
                                <option selected="" value="1">x1.0</option>
                                <option value="1.25">x1.25</option>
                                <option value="1.5">x1.5</option>
                            </select>
                        </div>
                    </div>
                    <div className="level-item">
                            <i className="fas fa-volume-up"></i>
                        <span 
                            ref = { this._refVolumeOuter }
                            onClick = { (e) => this.onClickVolume(e) }
                            className="outer-vol">
                            <span 
                                ref = { this._refVolumeInner }
                                className="inner-vol"></span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}


export default PlayBar;