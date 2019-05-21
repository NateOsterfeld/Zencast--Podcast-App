import React, { Component } from 'react';
import './App.css';
import Popular from './components/Popular/Popular';
import Navigation from './components/Navigation/Navigation';
import Discover from './components/Discover/Discover';
import Menu from './components/Menu/Menu';
import GenrePodcasts from './components/GenrePodcasts/GenrePodcasts';
import Episodes from './components/Episodes/Episodes';
import PlayBar from './components/PlayBar/PlayBar';


class App extends Component {
  constructor() {
    super();
    this._refPlayBar = React.createRef();
    this.state = {
      popular: [],
      route: 'popular',
      genresMenu: [],
      genrePodcasts: { name: '', podcasts: [] },
      episodesObj: { id: '', title: '', image: '', publisher: '', episodes: [] },
      playBarObj: { audio: '', image: {}, enclosure: {}, title: '', publisher: '', pubdate: '' },
      hasPlayed: ''
    }
  }

  componentDidMount() {
    this.getMenuItems();
    this.state.route === 'popular' 
        ? this.getPopular() 
        : console.log('get discover');
  }

  getPopular = () => {
    fetch('http://localhost:3000/popular')
    .then(response1 => response1.json())
    .then(response2 => {
      this.setState({ popular: response2 })
    })
  }

  createPlayBarObj = (audio, image, enclosure, title, hasPlayed, publisher, pubdate) => {
    this.setState({ playBarObj: { audio: audio, image: image, enclosure: enclosure, title: title, publisher: publisher, pubdate: pubdate },
                    hasPlayed: hasPlayed })
  }

  hasPlayed = (hasPlayed) => {
    this.setState({ hasPlayed: hasPlayed.className });
  }

  getGenre = (id, name) => {
    const url = `https://itunes.apple.com/search?term=podcast&genreId=${id}&limit=50`;
    fetch(url)
    .then(response => response.json())
    .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }));
  }

  getEpisodes = (id, title, image, publisher) => {
    fetch(`http://localhost:3000/episodes/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ route: 'episodes', episodesObj: {id:id, title:title, image:image, publisher:publisher, mainDescription: response[0].mainDescription, episodes: response }});
      })
  }

  getMenuItems = () => {
    fetch('http://localhost:3000/genresMenu')
    .then(response => response.json())
    .then(response => {
      this.setState({ genresMenu: response });
    })
  }

  //possible switch which methods come first. so run changeroute inside getpopular instead of getpopular inside changeroute like is
  // also possible to just call setstate({route: popular}) inside getpopular method and call that only and get rid of changeroute method
  changeRoute = (route) => {
    if (route === 'popular') {
      this.setState({ route: 'popular' });
      this.getPopular();
    } else if (route === 'discover') {
        this.setState({ route: 'discover' });
      }
  }

  render() {
    const { route } = this.state;
    return (
      <div className="App">
        <Navigation changeRoute={this.changeRoute} />
        <section className="section">
            {route === 'episodes' && <Episodes episodesObj={this.state.episodesObj} postPlayBarObj={this.createPlayBarObj} hasPlayed={this.hasPlayed} />}
          <div className="case">
            {route !== 'episodes' && <Menu genres={this.state.genresMenu} getGenre={this.getGenre} /> }
            {route === 'popular' && <Popular podcasts={this.state.popular} getEpisodes={this.getEpisodes} /> }
            {route === 'discover' && <Discover getEpisodes={this.getEpisodes} /> }
            {route === 'genre' && <GenrePodcasts genrePodcasts={this.state.genrePodcasts} getEpisodes={this.getEpisodes} /> }
          </div>
        </section>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <PlayBar playBarObj={this.state.playBarObj} hasPlayed={this.state.hasPlayed} />
        </nav>
      </div>
    );
  }
  
}

export default App;
