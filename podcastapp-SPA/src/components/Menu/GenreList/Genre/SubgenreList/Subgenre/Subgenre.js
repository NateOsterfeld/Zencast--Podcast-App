import React from 'react';
import './Subgenre.css';

const Subgenre = ({ id, name, getGenre }) => {
    return (
            <div className="subgenre-name">
                <p onClick = {(e) => getGenre(id, name, e) }
                   className="">{name}
                </p>
            </div>
    )
}

export default Subgenre;