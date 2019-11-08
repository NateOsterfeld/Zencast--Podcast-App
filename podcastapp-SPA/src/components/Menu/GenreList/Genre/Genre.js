import React from 'react';
import SubgenresList from './SubgenreList/SubgenreList';
import './Genre.css';
import { Link } from 'react-router-dom';

const Genre = ({ id, name, subgenres, getGenre }) => {
    let noChange = false
    const toggleList = (event) => {
        let menuItem = event.target.closest('.menu-item-container')
        let subgenre = menuItem.querySelector('.subgenre-container')
        if (event.target.tagName === 'I' && event.type === 'mouseenter') {
            subgenre.style.display = 'inherit'
            event.target.style.rotate = '90deg'
            noChange = true
        } else if (event.type === 'click' && !noChange) {
            if (subgenre.style.display === 'inherit') {
                subgenre.style.display = 'none'
                menuItem.querySelector('.fa-chevron-right').style.rotate = ''              
            } else {
                subgenre.style.display = 'inherit'
                event.target.style.rotate = '90deg'
            }
        }  else if (event.type === 'mouseleave') {
            subgenre.style.display = 'none'
            
            if (menuItem.querySelector('.fa-chevron-right')) 
                menuItem.querySelector('.fa-chevron-right').style.rotate = ''              
        } else {
            noChange = false
        }
    }

    const styleLink = {
        textDecoration: 'none',
        display: 'flex',
    }


    return (
        <div onMouseLeave = { (e) => toggleList(e)} className="menu-item-container">
            <span onClick = { (e) => toggleList(e)} className="menu-icon">
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
