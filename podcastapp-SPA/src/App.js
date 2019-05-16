import React, { Component } from 'react';
import './App.css';
import Popular from './components/Popular/Popular';
import Navigation from './components/Navigation/Navigation';
import Discover from './components/Discover/Discover';
import Menu from './components/Menu/Menu';
import GenrePodcasts from './components/GenrePodcasts/GenrePodcasts';
// idea to add state inside popular component to save/cache podcasts once they've been loaded there
// for discover, use curated lists

class App extends Component {
  constructor() {
    super();
    this.state = {
      popular: [],
      route: 'popular',
      genresMenu: [],
      genrePodcasts: { name: '', podcasts: [] }
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
    .then(response2 => this.setState({ popular: response2 }))
  }

  getGenre = (id, name) => {
    const url = `https://itunes.apple.com/search?term=podcast&genreId=${id}&limit=50`;
    fetch(url)
    .then(response => response.json())
    .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }));
  }

  getEpisodes = (id, title, name, publisher) => {
    console.log('id', id, 'title', title, 'name', name, 'publisher', publisher);
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
        <enclosure length="98199430" type="audio/mpeg" url="http://traffic.libsyn.com/joeroganexp/p1297.mp3?dest-id=19997" />
          <div className="case">
            <Menu genres={this.state.genresMenu} getGenre={this.getGenre} />
            {route === 'popular' && <Popular podcasts={this.state.popular} getEpisodes={this.getEpisodes} /> }
            {route === 'discover' && <Discover getEpisodes={this.getEpisodes} /> }
            {route === 'genre' && <GenrePodcasts genrePodcasts={this.state.genrePodcasts} getEpisodes={this.getEpisodes} /> }
          </div>
        </section>
      </div>
    );
  }
  
}

export default App;
