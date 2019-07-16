import React from 'react';
import './Subgenre.css';
import { Link } from 'react-router-dom';

const Subgenre = ({ id, name, getGenre }) => {

    const styleLink = {
        textDecoration: 'none',
        display: 'flex',
    }

    return (
            <Link to={`/genres/${name.toLowerCase()}`} style={styleLink} className="subgenre-name">
                <p onClick = {(e) => getGenre(id, name, e) }
                   className="">{name}
                </p>
            </Link>
    )
}

export default Subgenre;