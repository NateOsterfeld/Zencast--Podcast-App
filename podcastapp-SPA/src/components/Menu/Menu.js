import React from 'react';
import './Menu.css';
import GenreList from './GenreList/GenreList';

const Menu = (props) => {

    let handleSearch = (e) => {    
        let navSearch = document.querySelector('.nav-search');
        e.target.value 
            ? props.getSearchedPodcasts(e.target.value, 'search')
            : props.getSearchedPodcasts('', 'popular');

        if (e.target.value && navSearch.value.length > 0)  
            navSearch.value = '';
    }
  
    return (
        <div className="menu">
            <ul className="menu-list">
                <form className="form-inline">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input
                    
                        onKeyUp = { (e) => handleSearch(e) } 
                        className="form-control menu-search" type='text' placeholder='Search' aria-label="Search" 
                    />
                </form>
                    <p className="menu-label">
                        Podcast
                    </p>
                    <li>
                        <a href="" className="menu-nav">
                            <span className="menu-icon"></span>
                            Discover
                        </a>
                    </li>
                    <li>
                        <a href="" className="menu-nav">
                            <span className="menu-icon"></span>
                            Popular
                        </a>
                    </li>
                    <p className="menu-label">Categories</p>
                    <GenreList genres={props.genres} getGenre={props.getGenre} />
            </ul>
        </div>
    );  
}


export default Menu;