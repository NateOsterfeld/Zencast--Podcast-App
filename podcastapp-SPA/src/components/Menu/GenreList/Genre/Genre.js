import React from 'react';
import SubgenresList from './SubgenreList/SubgenreList';
import './Genre.css';
import { Link } from 'react-router-dom';


const Genre = ({ id, name, subgenres, getGenre }) => {
    const collapseList = (event) => {
        console.log('event', event.target.parentNode.nextElementSibling.lastElementChild);
        let el = event.target.parentNode.nextElementSibling.lastElementChild;
        if (el.className === 'hidden') {
            el.classList.remove('hidden');
            el.classList.add('subgenre-container');
            event.target.classList.remove('fa-chevron-right');
            event.target.classList.add('fa-sort-down');
        } else {
            el.classList.add('hidden');
            el.classList.remove('subgenre-container');
            event.target.classList.remove('fa-sort-down');
            event.target.classList.add('fa-chevron-right');
        }
    }

    const styleLink = {
        textDecoration: 'none',
        display: 'flex',
    }


    return (
        <div className="menu-item-container">
            <span className="menu-icon">
                {
                    typeof subgenres != 'undefined'
                    ? <i onClick = { (e) => collapseList(e) }
                        className="fas fas fa-chevron-right grow chev">
                    </i>
                    : <i className="fas fas fa-chevron-right clear-icon"></i>
                }
            </span>
            <Link to={`/genres/${name.toLowerCase()}`} style={styleLink} className="menu-list-item"  >
                <div className="genre-name">
                    <p onClick = { (e) => getGenre(id, name, e, true) } >
                        {name}
                    </p>  
                </div>
                <ul className="hidden">
                {
                    typeof subgenres != 'undefined' 
                    && <SubgenresList subgenres={subgenres} getGenre={getGenre} /> 
                }
                </ul>
            </Link>
        </div>
    )      
}

export default Genre;
