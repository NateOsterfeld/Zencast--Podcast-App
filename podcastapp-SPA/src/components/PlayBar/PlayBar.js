import React from 'react';
import './PlayBar.css';

const PlayBar = () => {
    return (
        <div class="level is-mobile">
            <div class="level-left" id="mobile-player">
                <a class="level-item" data-target="player.artLink" href="/podcasts/360084272?episode_id=http://blog.joerogan.net/?p=1810">
                    <img data-target="player.art" id="playing-art" src="" />
                        <div class="art-placeholder">
                            <i class="fas fa-headphones">

                            </i>
                        </div>
                    <div class="player-loading" data-target="player.loading">
                        <div class="button is-link is-loading is-large is-rounded">

                        </div>
                    </div>
                </a>
                <div class="level-item" id="player-controls">
                    <div class="field has-addons">
                        <div class="control">
                            <button class="button is-large" data-action="player#seekBack">
                                <span>
                                    <i class="fas fa-play">

                                    </i>
                                </span>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button is-large" data-action="player#togglePlay" data-target="player.toggle">
                                <span class="icon is-medium is-marginless" id="play-icon">
                                    <i class="fas fa-play">

                                    </i>
                                </span>
                                <span class="icon is-medium is-marginless hidden" id="pause-icon">
                                    <i class="mdi mdi-pause mdi-36px">

                                    </i>
                                </span>
                            </button>
                        </div>
                        <div class="control">
                            <button class="button is-large" data-action="player#seekForward">
                                <span>
                                    <i class="fas fa-play">

                                    </i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="level-item is-hidden-mobile">
                <div class="has-text-centered" id="player-center">
                    <p class="player-info is-size-6">
                        <a data-target="player.episode" href="/podcasts/360084272?episode_id=http://blog.joerogan.net/?p=1810">PODCAST #1 - Brian Redban
                        </a>
                    </p>
                    <p class="player-info">
                        <a data-target="player.podcast" href="/podcasts/360084272">The Joe Rogan Experience - Dec 24, 2009
                        </a>
                    </p>
                <input class="slider is-fullwidth" data-action="click->player#setPosition" data-target="player.scrub" id="scrub" max="1" min="0" step="0.001" type="range" value="0" />
                    <p class="player-time" data-target="player.time">0:00 / 0:00
                    </p>
                </div>
            </div>
            <div class="level-right is-hidden-touch">
                <div class="level-item">
                    <div class="select is-rounded is-small">
                        <select data-action="player#setSpeed" data-target="player.speed" type="text">
                            <option value="0.5">x0.5</option>
                            <option value="0.75">x0.75</option>
                            <option selected="" value="1">x1.0</option>
                            <option value="1.25">x1.25</option>
                            <option value="1.5">x1.5</option>
                        </select>
                    </div>
                </div>
                <div class="level-item">
                    <span class="icon">
                        <i class="fas fa-volume-up">

                        </i>
                    </span>
                    <input class="slider" data-action="player#setVolume" data-target="player.volume" max="1" min="0" step="0.01" type="range" value="1" />
                </div>
            </div>
        </div>
    )
}

export default PlayBar;
/*
<div className="playbar">
        //     <div className="playbar-left">
        //         <div className="playbar-left-image">
        //             <a href="">
        //                 <img src=""></img>
        //                 <div className="placeholder"><i class="fas fa-headphones"></i></div>
        //             </a>
        //         </div>
        //         <div className="playbar-left-controls">
        //             <div className="controls-container">
        //                 <div className="control">
        //                     <div className="control-rewind">
        //                         <button>
        //                             <span><i class="fas fa-play"></i></span>
        //                         </button>
                                
        //                     </div>
        //                 </div>
        //                 <div className="control">
        //                     <div className="control-play">
        //                         <i class="fas fa-play"></i>
        //                     </div>
        //                 </div>
        //                 <div className="control">
        //                     <div className="control-forward">
        //                         <i class="fas fa-play"></i>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="playbar-middle">

        //     </div>
        //     <div className="playbar-right">

        //     </div>
        // </div> */