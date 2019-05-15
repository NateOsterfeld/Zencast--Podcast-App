import React, { Component } from 'react';
import './App.css';
import Popular from './components/Popular/Popular';
import Navigation from './components/Navigation/Navigation';
import Discover from './components/Discover/Discover';
import Menu from './components/Menu/Menu';
// idea to add state inside popular component to save/cache podcasts once they've been loaded there


class App extends Component {
  constructor() {
    super();
    this.state = {
      popular: [],
      route: 'discover',
      genres: []
    }
  }

  componentDidMount() {
    this.state.route === 'popular' 
        ? this.getPopular() 
        : this.getMenuItems();
  }

  getPopular = () => {
    fetch('http://localhost:3000/popular')
    .then(response1 => response1.json())
    .then(response2 => this.setState({ popular: response2 }))
  }

  getMenuItems = () => {
    fetch('http://localhost:3000/genres')
    .then(response => response.json())
    .then(response => {
      this.setState({ genres: response });
      console.log('genres', this.state.genres);
    })
  }

  changeRoute = (route) => {
    if (route === 'popular') {
      this.setState({ route: 'popular' });
      this.getPopular();
      console.log('wut', this.state.route);
    } else if (route === 'discover') {
        this.setState({ route: 'discover' });

        console.log('discovery');
      }
    
  }

  render() {
    const { route } = this.state;
    return (
      <div className="App">
        <Navigation changeRoute={this.changeRoute} />
        <section className="section">
          <div className="case">
            <Menu genres={this.state.genres} />
            {route === 'popular' && <Popular podcasts={this.state.popular} /> }
            {route === 'discover' && <Discover /> }
              
          </div>
        </section>
        
       
      </div>
    );
  }
  
}

export default App;
