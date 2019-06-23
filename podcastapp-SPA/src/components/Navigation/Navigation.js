import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = ({ getSearchedPodcasts, changeRoute }) => {
  const [menuSearchNode, setMenuSearchNode] = useState();
  const [navSearchNode, setNavSearchNode] = useState();

  let setSearchNodes = () => {
    setMenuSearchNode(document.querySelector('.menu-search'));
    setNavSearchNode(document.querySelector('.nav-search'));
  } 

  useEffect(setSearchNodes); 

  let handleSearch = (e) => {
    e.target.value
      ? getSearchedPodcasts(e.target.value, 'search')
      : getSearchedPodcasts('', 'popular');
    
    if (menuSearchNode !== null)
    if (e.target.value && menuSearchNode.value.length > 0)
      menuSearchNode.value = '';
  }

  let handlePopularClick = (e) => {
    e.target.parentNode.classList.add('active');
    document.querySelector('.nav-item-discover').classList.remove('active');
    changeRoute('popular')
    menuSearchNode !== null &&  //eslint-disable-line
    menuSearchNode.value.length > 0 
      ? menuSearchNode.value = ''
      : navSearchNode.value.length > 0
        navSearchNode.value = ''
  }

  let handleDiscoverClick = (e) => {
    e.target.parentNode.classList.add('active');
    document.querySelector('.nav-item-popular').classList.remove('active');
    changeRoute('discover')
    menuSearchNode !== null &&  //eslint-disable-line
    menuSearchNode.value.length > 0 
      ? menuSearchNode.value = ''
      : navSearchNode.value.length > 0
        navSearchNode.value = ''
  }
  
  return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
    <a className="navbar-brand" href="">Godcast</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item nav-item-discover active">
          <div 
              onClick = {(e) => handleDiscoverClick(e) }
              className="nav-link" href="/discover">Discover <span className="sr-only">(current)</span></div>
        </li>
        <li className="nav-item nav-item-popular">
          <div 
              onClick = {(e) => handlePopularClick(e) }
              className="nav-link" href="/popular">Popular</div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="">About</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-md-0">
        <input 
          onChange = { (e) => handleSearch(e) }
          className="form-control nav-search" type="text" placeholder="Search" />
      </form>
    </div>
      <div className="nav-item dropdown">
          <a className="nav-link dropdown-toggle dropdown" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user-circle"></i></a>
          <div className="dropdown-menu" aria-labelledby="dropdown04">
            <a className="dropdown-item dim" href="">Log in</a>
            <a className="dropdown-item dim" href="">Sign up</a>
          </div>
        </div>
  </nav>
  )
}

export default Navigation;