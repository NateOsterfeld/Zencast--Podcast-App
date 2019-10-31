import React, { useState, useEffect } from 'react';
import './Menu.css';
import GenreList from './GenreList/GenreList';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    const [menuSearchNode, setMenuSearchNode] = useState();
    const [navSearchNode, setNavSearchNode] = useState();

    let setSearchNodes = () => {
        setMenuSearchNode(document.querySelector('.menu-search'));
        setNavSearchNode(document.querySelector('.nav-search'));
    }

    useEffect(() => setSearchNodes());

    return (
        <div className="menu">
            <ul className="menu-list">
                <form className="search-container form-inline-menu">
                    <i className="fas fa-search"></i>
                    <input
                        onChange={(e) => props.funcs.onSearch(e, navSearchNode)}
                        className="form-control menu-search" type='text' placeholder='Search' aria-label="Search"
                    />
                </form>
                <div className="menu-nav-container">
                    <p className="menu-label">          ZENCAST
                    </p>
                    <li>
                        <Link to='/discover' className="menu-nav" id="discover-menu"
                            onClick= { () => props.funcs.onDisc(menuSearchNode, navSearchNode, false) } >
                            <i className="fas fa-compass"
                                onClick = { () => props.funcs.onDisc(menuSearchNode, navSearchNode, true) } >
                            </i>
                            <span className="menu-icon">
                            </span>
                                        Discover
                        </Link>
                    </li>
                    <li>
                        <Link to='/popular' className="menu-nav" id="popular-menu"
                            onClick = { () => props.funcs.onPop(menuSearchNode, navSearchNode) } >
                            <i className="fas fa-fire"></i>
                            <span className="menu-icon"></span>
                                        Popular
                        </Link>
                    </li>
                </div>
                <GenreList genres={props.genres} getGenre={props.getGenre} />
            </ul>
        </div>
    );
}


export default Menu;
