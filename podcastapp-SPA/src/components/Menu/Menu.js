import React, { useEffect, useState } from 'react';
import './Menu.css';
import GenreList from './GenreList/GenreList';
import { isBoolean } from 'util';

const Menu = (props) => {
    const [searchHolder, setSearchHolder] = useState();
    const [shouldUpdate, setShouldUpdate] = useState();
    const [searchNode, setSearchNode] = useState();
    const [hasUpdate, setHasUpdate] = useState(false);
    
    let handleSearch = (e) => {
        setSearchHolder(e.target.value);
        e.target.value ? (props.getSearchedPodcasts(e.target.value, 'search', 'clearNavSearch'), props.resetSearch('clearNavSearch'))  // eslint-disable-line
                       : props.getSearchedPodcasts('', 'popular');
        
        console.log('hasUpdate: handleSearch ', hasUpdate);
    }

    let resetValue = () => {
        setHasUpdate(true);
        setShouldUpdate(false);
        searchNode.value = '';
    }

    useEffect(() => {
        setSearchNode(document.querySelector('.fuck'));
        if (!hasUpdate)
        setShouldUpdate(props.updateSearchHolder);
        
        // console.log('shouldupdate', shouldUpdate);
        console.log('props.updateSearchHolder: useEffect ', props.updateSearchHolder);
        console.log('shouldUpdate: useEffect ', shouldUpdate);
        
        
        
        if (shouldUpdate) {
            if (!hasUpdate) {
                resetValue();
            }
        } else if (!shouldUpdate) {
            // console.log('erm', searchNode.classList);
            // searchNode.placeholder = 'Search';
        }
    })

    

    return (
        <div className="menu">
            <ul className="menu-list">
                <form className="form-inline">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input
                    
                        onKeyUp = { (e) => handleSearch(e) } 
                        className="form-control fuck" type='text' placeholder='Search' aria-label="Search" 
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