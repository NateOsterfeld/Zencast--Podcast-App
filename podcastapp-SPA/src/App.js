import React, { Component } from 'react';
import './App.css';
import Popular from './components/Popular/Popular';
import Navigation from './components/Navigation/Navigation';
import Discover from './components/Discover/Discover';
import Menu from './components/Menu/Menu';
import GenrePodcasts from './components/GenrePodcasts/GenrePodcasts';
import Episodes from './components/Episodes/Episodes';
import PlayBar from './components/PlayBar/PlayBar';
import Search from './components/Search/Search';
import CuratedPodcasts from './components/CuratedPodcasts/CuratedPodcasts';
import CuratedLists from './components/Discover/CuratedLists/CuratedLists';

import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this._refPlayBar = React.createRef();
    this.state = {
      popular: [],
      searched: [],
      searchTerm: '',
      route: 'discover',
      genresMenu: [],
      genrePodcasts: { name: '', podcasts: [] },
      curatedListObj: { id: 0, title: '', podcasts: [] },
      curatedLists: [],
      episodesObj: { id: '', title: '', image: '', publisher: '', episodes: [], website: '' },
      playBarObj: { audio: '', image: {}, enclosure: {}, title: '', publisher: '', pubdate: '' },
      hasPlayed: '',
    }
  }

  componentDidMount() {
    this.getMenuItems();
    this.state.route === 'popular'
      ? this.getPopular()
      : this.getDiscover()
  }

  getPopular = () => {
    fetch('/popular')
      .then(response => response.json())
      .then(response => {
        this.setState({ popular: response })
      })
  }

  getDiscover = () => {
    this.getPopular();
    this.getCuratedLists();
    this.getRandomGenre();
  }

  getCuratedLists = (random = true) => {
    fetch(`/listOfCuratedLists`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ random: random })
    })
      .then(response => response.json())
      .then(response => this.setState({ curatedLists: response.curated_lists }))
  }

  getListPodcasts = (id, title) => {
    fetch(`/podcastsInCuratedList/${id}`)
      .then(response => response.json())
      .then(response => this.setState({
        curatedListObj: { id: id, title: title, podcasts: response.podcasts },
        route: 'curatedPodcasts'
      }))
  }

  createPlayBarObj = (audio, image, enclosure, title, hasPlayed, publisher, pubdate) => {
    this.setState({
      playBarObj: { audio: audio, image: image, enclosure: enclosure, title: title, publisher: publisher, pubdate: pubdate },
      hasPlayed: hasPlayed
    })
  }

  getGenre = (id, name, e, isFromMenu) => {
    const url = `https://itunes.apple.com/search?term=podcast&genreId=${id}&limit=50`;
    if (isFromMenu) {
      if (!e.target.classList.value.includes('chev') && name === e.target.innerText) {
        fetch(url)
          .then(response => response.json())
          .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }))
          .catch(err => console.log('error', err));
      }
    } else if (!isFromMenu) {
      fetch(url)
        .then(response => response.json())
        .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }))
        .catch(err => console.log('error', err));
    }
  }

  menuNavFuncs = {
    onPop: (menuSearchNode, navSearchNode) => {
      this.changeRoute('popular')
      menuSearchNode !== null &&  //eslint-disable-line
        menuSearchNode.value.length > 0 
          ? menuSearchNode.value = ''
          : navSearchNode.value.length > 0
            navSearchNode.value = ''
    },
  
    onDisc: (menuSearchNode, navSearchNode, refresh) => {
      this.changeRoute('discover', refresh)
      menuSearchNode !== null &&  //eslint-disable-line
        menuSearchNode.value.length > 0 
          ? menuSearchNode.value = ''
          : navSearchNode.value.length > 0
            navSearchNode.value = ''
    },

    onSearch: (e, oppositeSearchNode) => {
      e.target.value
        ? this.getSearchedPodcasts(e.target.value, 'search')
        : this.getSearchedPodcasts('', 'popular');
      
      if (oppositeSearchNode !== null)
      if (e.target.value && oppositeSearchNode.value.length > 0)
        oppositeSearchNode.value = '';
    }
  }

  getSearchedPodcasts = (term, route) => {
    this.setState({ route: route });
    term !== '' && fetch(`/searchPodcasts/${term}`)
      .then(response => response.json())
      .then(response => this.setState({ searched: response, searchTerm: term }))
  }

  // pass "itunesid" from listennotes cl podcasts obj
  getEpisodes = (id, title, image, publisher, website) => {
    fetch(`/episodes/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          route: 'episodes',
          episodesObj: { id: id, title: title, image: image, publisher: publisher, mainDescription: response[0].mainDescription, episodes: response, website: website }
        });
      })
      .catch(err => console.log('error', err));
  }

  getRandomGenre = () => {
    let random = Math.floor(Math.random() * this.state.genresMenu.length);
    this.state.genresMenu.map((genre, i) => {
      if (random === i) {
        const url = `https://itunes.apple.com/search?term=podcast&genreId=${genre.id}&limit=10`;
        fetch(url)
          .then(response => response.json())
          .then(response => this.setState({ genrePodcasts: { id: genre.id, name: genre.name, podcasts: response.results } }));
      }
    });
  }

  getMenuItems = () => {
    fetch('/genresMenu')
      .then(response => response.json())
      .then(response => {
        this.setState({ genresMenu: response })
        if (this.state.route === 'discover')
          this.getRandomGenre();
      })
  }

  changeRoute = (route, refresh) => {
    if (route === 'popular') {
      this.setState({ route: 'popular' });
      this.getPopular();
    } else if (route === 'discover') {
        this.setState({ route: 'discover' });
        if (refresh)
          this.getDiscover();
    }
  }



  render() {
    const { route } = this.state;
    return (
      <Router>
        <div className="App">
          <Navigation funcs={this.menuNavFuncs} />
          <section className="section">

            <div className="case">
              <Route path='/episodes/:id'
                render={(props) =>
                  <React.Fragment>
                    {route === 'search'
                      && <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />}
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <Episodes episodesObj={this.state.episodesObj} postPlayBarObj={this.createPlayBarObj} hasPlayed={this.hasPlayed} {...props} />}
                  </React.Fragment>
                }
              />

              <Route exact path='/'
                /* '<>' is the same as React.Fragment */
                render={(props) =>
                  <> 
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <Discover getEpisodes={this.getEpisodes} topPodcasts={this.state.popular} getGenre={this.getGenre} getEpisodes={this.getEpisodes}
                        genre={this.state.genrePodcasts} curatedLists={this.state.curatedLists} getListPodcasts={this.getListPodcasts} {...props} />}
                  </>
                }
              />

              <Route path='/discover'
                render={(props) =>
                  <>
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <Discover getEpisodes={this.getEpisodes} topPodcasts={this.state.popular} getGenre={this.getGenre} getEpisodes={this.getEpisodes}
                        genre={this.state.genrePodcasts} curatedLists={this.state.curatedLists} getListPodcasts={this.getListPodcasts} {...props} />}
                  </>
                }
              />

              <Route path='/popular'
                render={(props) =>
                  <>
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <Popular podcasts={this.state.popular} getEpisodes={this.getEpisodes} {...props} />}
                  </>
                }
              />

              <Route path='/genres/:name'
                render={(props) =>
                  <>
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <GenrePodcasts genrePodcasts={this.state.genrePodcasts} getEpisodes={this.getEpisodes} {...props} />}
                  </>
                }
              />

              <Route path='/curated/:name'
                render={(props) =>
                  <>
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <CuratedPodcasts curatedListObj={this.state.curatedListObj} getEpisodes={this.getEpisodes} {...props} />}
                  </>
                }
              />
              
              <Route path='/curatedLists'
                render={(props) =>
                  <>
                    <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} funcs={this.menuNavFuncs} {...props} />
                    {route === 'search'
                      && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
                    {route !== 'search'
                      && <CuratedLists curatedLists={this.state.curatedLists} getListPodcasts={this.getListPodcasts} amount={20} {...props} />}
                  </>
                }
              />
            </div>
          </section>
          <nav className="navbar fixed-bottom navbar-light bg-light">
            <PlayBar playBarObj={this.state.playBarObj} hasPlayed={this.state.hasPlayed} />
          </nav>
        </div>
      </Router>
    );
  }
}

export default App;
