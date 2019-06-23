import React from 'react';
import SubgenresList from './SubgenreList/SubgenreList';
import './Genre.css';


const Genre = ({ id, name, subgenres, getGenre }) => {
    const collapseList = (event) => {
        let el = event.target.parentNode.nextElementSibling.nextElementSibling;
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


    return (
        <li className="menu-list-item" onClick = { (e) => getGenre(id, name, e, true) } >
            <span className="menu-icon">
            {
                typeof subgenres != 'undefined'
                ? <i onClick = { (e) => collapseList(e) }
                     className="fas fas fa-chevron-right grow chev">
                  </i>
                : <i className="fas fas fa-chevron-right clear-icon"></i>
            }
            </span>
            <div className="genre-name">
                <p>
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
