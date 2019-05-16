import React from 'react';
import './Menu.css';
import GenreList from './GenreList/GenreList';

// Pass in "GET" categories. Run forEach loop to print out "li"s for them
const Menu = ({ genres, getGenre }) => {
    return (
        <div className="menu">
            <ul className="menu-list">
                <form className="form-inline">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
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
                    <GenreList genres={genres} getGenre={getGenre} />
            </ul>
        </div>
    );
}

export default Menu;