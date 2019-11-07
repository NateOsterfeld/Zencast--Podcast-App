import React from 'react';
import './PlayBar.scss';

class PlayBar extends React.Component {
    constructor(props) {
        super(props); //audio, image, enclosure, title
        // this.onClickPlayButton = this.onClickPlayButton.bind(this);
        // this.onClickSeekBarOuter = this.onClickSeekBarOuter.bind(this);
        // this.onClickVolume = this.onClickVolume.bind(this);
        this._refPlayButton = React.createRef();
        this._refSeekBarInner = React.createRef();
        this._refSeekBarOuter = React.createRef();
        this._refImage = React.createRef();
        this._refVolumeInner = React.createRef();
        this._refVolumeOuter = React.createRef();

        this.state = {
            playButton: 'play',
            duration: 0,
            current: 0,
            finalPlay: 'play',
            playCounter: 0
        }

    }

    isNewPodcast = true;

    //remember to view audio object! playback rate to change speed and so much more

    componentDidUpdate(prevProps) {
        if (this.props.playBarObj.title !== prevProps.playBarObj.title) {
            this.playPodcast(this.isNewPodcast);
            if (prevProps.playBarObj.title.length) {
                prevProps.playBarObj.audio.pause();
            }
        }
    }

    resetTransition = false;
    playPodcast = (isNewPodcast) => {
        if (isNewPodcast) {
            this.props.playBarObj.audio.src = this.props.playBarObj.enclosure.url; // set up url for src to be able to play on audio element
        }
        this.setState({ finalPlay: 'pause' });
        let el = document.querySelector('#playing-art'); //grab img
        el.style.top = '0px'; //want to start at 'base' and reset from changed values in 'pausePodcast'
        el.style.transform = 'translateY(0px)'; //same here
        if (this.resetTransition) { //let skip first time so it will transition down
            el.style.transition = '0s'; //because top and transform will not initially be 0, we want to skip to setting at 0 with no transition after first buttonclick
        }
        this._refImage.current.className = 'animateImage'; //begin animating again (will apply transition on pause click to come down smoothly)
        this._refImage.current.nextSibling.style.color = 'white';
        this.props.playBarObj.audio.play();
        this.updateSeekBar();
    }

    updateSeekBar = () => {
        setInterval(() => {
            let seekBarPercentage = this.getPercentage(this.props.playBarObj.audio.currentTime.toFixed(2), this.props.playBarObj.audio.duration.toFixed(2));
            this._refSeekBarInner.current.style.width = seekBarPercentage + '%';
            let convertedEndTime = this.convertToSecsEnd(this.props.playBarObj.audio.duration);
            this.setState({ duration: convertedEndTime })
            let convertedTime = this.convertToSeconds(this.props.playBarObj.audio.currentTime);
            this.setState({ current: convertedTime });
        }, 250);
    }

    getPercentage = (currentValue, totalLength) => {
        let calcPercentage = (currentValue / totalLength) * 100;
        return parseFloat(calcPercentage.toString());
    }

    convertToSeconds = (currentTime) => {
        let seconds = currentTime % 60; //currentTime and "converted"seconds will run synonymous until 60, then seconds starts over. eg1)45 = 45 % 60 eg2)15 = 75 % 60 eg3)5 = 125 % 60
        let foo = currentTime - seconds; //subtract "converted/leftover"seconds from currentTime(totalseconds) to always get a divisible of 60. eg1)0 = 45 - 45 eg2)60 = 75 - 15 eg3)120=125-5
        let minutes = foo / 60; //divide this number by 60 to see how many minutes we've accounted for and add seconds separately below eg1)0 = 0/60 eg2) 1 = 60/60 eg3)2 = 120/60
        if (seconds < 9.5) { //use 9.5 here because you want 01, 02, 03.. up to 09 but at 9.5 it rounds up to 10 so you'd get 010 otherwise
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
        if (this.props.hasPlayed) {
            if (this._refPlayButton.current.className === 'play') {
                this.playPodcast(!this.isNewPodcast);
            }
            else if (this._refPlayButton.current.className === 'pause') {
                this.setState({ finalPlay: 'play' });
                let el = document.querySelector('#playing-art'); //select image
                el.style.transition = '1s linear all'; //apply transition
                let topVal = window.getComputedStyle(el).getPropertyValue('top'); // current proprety of "style.top" for image
                el.style.top = topVal; //set that number as actual style.top value
                let parse = topVal.split('px'); //split #px into array [#, px]
                let value = Number(parse[0]) + 30; //grab number or array[0]
                let finvalue = 30 - value; //subtract from 30 as this will be how far away from base/0px img must travel
                this._refImage.current.classList.remove('animateImage'); //remove class animateImage thus stopping animation
                el.style.transform = 'translateY(' + finvalue + 'px' + ')'; //apply finValue from above to transform the correct amount of pixels down through transitioning
                this.resetTransition = true; //set resetTransition to true (had to be false first time for 'playPodcast') to keep transition
                this.props.playBarObj.audio.pause();
            }
        }
    }

    onClickSeekBarOuter = (e) => {
        if (!this.props.playBarObj.audio.ended && this.state.duration !== 0) {
            let seekPosition = e.pageX - this._refSeekBarOuter.current.offsetLeft;
            if (seekPosition >= 0 && seekPosition < this._refSeekBarOuter.current.offsetLeft + e.pageX) {
                let newCurrentTime = (seekPosition * this.props.playBarObj.audio.duration.toFixed(2)) / this._refSeekBarOuter.current.offsetWidth;
                this.props.playBarObj.audio.currentTime = newCurrentTime;
            }
        }
    }

    onClickVolume = (e) => {
        if (this.props.hasPlayed) {
            let volumePosition = e.pageX - this._refVolumeOuter.current.offsetLeft;
            let audioVolume = volumePosition / this._refVolumeOuter.current.offsetWidth;

            if (audioVolume >= 0 && audioVolume <= 1) {
                this.props.playBarObj.audio.volume = audioVolume;
                this._refVolumeInner.current.style.width = audioVolume * 100 + '%';
            }
        }
    }



    render() {
        const { playBarObj } = this.props;
        return (
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <img
                            ref={this._refImage}
                            id="playing-art" src={playBarObj.image} alt="" />
                        <div className="art-placeholder">
                            <i className="fas fa-headphones">

                            </i>
                        </div>
                        
                    </div>
                    <div className="level-item" id="player-controls">
                        <div className="controls ma">
                            <div className="control">
                                <button className="button btn">
                                    <span>
                                        <i className="fas fa-backward">

                                        </i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button
                                    ref={this._refPlayButton}
                                    onClick={() => this.onClickPlayButton()}
                                    className={this.state.finalPlay} id="play-btn">
                                    <span className="icon" id="play-icon">
                                        <i className="fas fa-play"></i>
                                        <i className="fas fa-pause"></i>
                                    </span>



                                </button>
                            </div>
                            <div className="control">
                                <button className="button btn btn-for">
                                    <span>
                                        <i className="fas fa-forward">

                                        </i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="level-item">
                    <div className="player-center">
                        <p className="player-info">
                            <a data-target="player.episode" href="#">
                                {playBarObj.title.length > 0 ? playBarObj.title : 'Go ahead...'}
                            </a>
                        </p>
                        <p className="player-info">
                            <a data-target="player.podcast" href="#">
                                {playBarObj.publisher.length > 0 ? playBarObj.publisher + '-' : 'play something already!'}
                            </a>
                        </p>
                        <div className="seekBar">
                            <span
                                ref={this._refSeekBarOuter}
                                onClick={(e) => this.onClickSeekBarOuter(e)}
                                className="outer">
                                <span
                                    ref={this._refSeekBarInner}
                                    className="inner"></span>
                            </span>
                        </div>
                        <div className="player-time" id="timing" data-target="player.time">
                            <div className="timing-start">{this.props.playBarObj.audio.duration ? this.state.current + ' /' : 0 + ' /'}</div>
                            <div className="timing-end">{this.props.playBarObj.audio.duration ? this.state.duration : 0}</div>
                        </div>
                    </div>
                </div>
                <div className="level-right ma">
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
                            ref={this._refVolumeOuter}
                            onClick={(e) => this.onClickVolume(e)}
                            className="outer-vol">
                            <span
                                ref={this._refVolumeInner}
                                className="inner-vol"></span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayBar;
