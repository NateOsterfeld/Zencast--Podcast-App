import React from 'react';
import SubgenresList from './SubgenreList/SubgenreList';
import './Genre.css';


const Genre = ({ id, name, subgenres, getGenre }) => {
    const collapseList = (event) => {
        let el = event.target.parentNode.nextElementSibling.nextElementSibling;
        if (el.className === 'hidden') {
            el.classList.remove('hidden');
            event.target.classList.remove('fa-chevron-right');
            event.target.classList.add('fa-sort-down');
        } else {
            el.classList.add('hidden');
            event.target.classList.remove('fa-sort-down');
            event.target.classList.add('fa-chevron-right');
        }
    }


    return (
        <li className="menu-list-item">
            <span className="menu-icon">
            {
                typeof subgenres != 'undefined'
                ? <i onClick = { (e) => collapseList(e) }
                     className="fas fas fa-chevron-right grow dim chev">
                  </i>
                : <i className="fas fas fa-chevron-right clear-icon"></i>
            }
            </span>
            <div className="genre-name grow">
                <p onClick = { () => getGenre(id, name) } >
                    {name}
                </p>  
            </div>
            <ul className="hidden">
            {
                typeof subgenres != 'undefined' 
                && <SubgenresList subgenres={subgenres} getGenre={getGenre} /> 
            }
            </ul>
        </li>
    )      
}

export default Genre;
