import React from 'react';
import './Subgenre.css';

const Subgenre = ({ id, name, getGenre }) => {
    return (
            <p 
                onClick = {() => getGenre(id, name) }
                className="subgenre-name grow">{name}</p>  
    )
}

export default Subgenre;