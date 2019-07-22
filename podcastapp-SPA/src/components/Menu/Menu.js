import React, { useState, useEffect } from 'react';
import './Menu.css';
import GenreList from './GenreList/GenreList';
import { Link } from 'react-router-dom';

const Menu = (props) => {

    const [navSearchNode, setNavSearchNode] = useState();

    useEffect(() => setNavSearchNode(document.querySelector('.nav-search')));

    let handleSearch = (e) => {
        e.target.value
            ? props.getSearchedPodcasts(e.target.value, 'search')
            : props.getSearchedPodcasts('', 'popular');

        if (e.target.value && navSearchNode.value.length > 0)
            navSearchNode.value = '';
    }

    return (
        <div className="menu">
            <ul className="menu-list">
                <form className="form-inline form-inline-menu">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input
                        onChange={(e) => handleSearch(e)}
                        className="form-control menu-search" type='text' placeholder='Search' aria-label="Search"
                    />
                </form>
                <p className="menu-label">
                    Podfast
                    </p>
                <li>
                    <Link to='/discover'  className="menu-nav" id="discover-menu">
                        <i className="fas fa-compass" aria-hidden="true"></i>
                        <span className="menu-icon"></span>
                        Discover
                        </Link>
                </li>
                <li>
                    <Link to='/popular' className="menu-nav" id="popular-menu">
                        <i className="fas fa-fire" aria-hidden="true"></i>
                        <span className="menu-icon"></span>
                        Popular
                        </Link>
                </li>
                <p className="menu-label">Categories</p>
                <GenreList genres={props.genres} getGenre={props.getGenre} />
            </ul>
        </div>
    );
}


export default Menu;