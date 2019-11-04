import React from 'react';
import SubgenresList from './SubgenreList/SubgenreList';
import './Genre.css';
import { Link } from 'react-router-dom';


const Genre = ({ id, name, subgenres, getGenre }) => {
    const toggleList = (event) => {
        if (event.target.tagName === 'I') {
            let menuItem = event.target.closest('.menu-item-container')
            let subgenre = menuItem.querySelector('.subgenre-container')
            subgenre.style.display = ''
            event.target.style.rotate = '90deg'
        } else {
            let menuItem = event.target.closest('.menu-item-container')
            let subgenre = menuItem.querySelector('.subgenre-container')
            subgenre.style.display = 'none'
            
            if (menuItem.querySelector('.fa-chevron-right')) 
                menuItem.querySelector('.fa-chevron-right').style.rotate = ''              
        }
    }

    const styleLink = {
        textDecoration: 'none',
        display: 'flex',
    }


    return (
        <div onMouseLeave = { (e) => toggleList(e)} className="menu-item-container">
            <span className="menu-icon">
                {
                    typeof subgenres != 'undefined'
                    && <i onMouseEnter = { (e) => toggleList(e) }
                        className="fas fa-chevron-right chev">
                       </i>
                }
            </span>
            <Link to={`/genres/${name.toLowerCase()}`} style={styleLink} className="menu-list-item"  >
                <div className="genre-name">
                    <p onClick = { (e) => getGenre(id, name, e, true) } >
                        {name}
                    </p>  
                </div>
                <ul className="subgenre-container" style={{display: 'none'}}>
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
