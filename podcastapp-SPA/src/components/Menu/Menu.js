import React from 'react';
import './Menu.css';

// Pass in "GET" categories. Run forEach loop to print out "li"s for them
const Menu = ({ genres }) => {

    const collapseList = (event) => {
        let el = event.target.parentNode.nextElementSibling.nextElementSibling;
        console.log(event.target.className);
        if (el.className === 'hidden') {
            el.classList.remove('hidden');
            event.target.classList.remove('fa-angle-double-right');
            event.target.classList.add('fa-sort-down');
        } else {
            el.classList.add('hidden');
            event.target.classList.remove('fa-sort-down');
            event.target.classList.add('fa-angle-double-right');
        }
    }
    const loadGenre = () => {
        console.log('load genre');
    }
    
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
                        <a href="">
                            <span className="menu-icon"></span>
                            Discover
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="menu-icon"></span>
                            Popular
                        </a>
                    </li>
                    <p className="menu-label">Categories</p>

                   
                    <li className="menu-list-item">
                            <span className="menu-icon">
                                <i 
                                    onClick = { (e) => collapseList(e) }
                                    className="fas fa-angle-double-right">
                                </i>
                            </span>
                            <div className="genre-name">
                                <p onClick = { () => loadGenre() } >Arts</p>  
                            </div>
                        <ul className="hidden">
                            <li>
                               <a>did it work</a>  
                            </li>
                        </ul>
                    </li>
            </ul>
        </div>
    );
}

export default Menu;