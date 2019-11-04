import React from 'react';
import Genre from './Genre/Genre';

const GenreList = ({ genres, getGenre }) => {
    return (
        <div className="genre-container">
                <p className="menu-label">      Categories
                </p>
            {
                genres.map(genre => {
                    return <Genre 
                        key={genre.id}
                        id={genre.id}
                        name={genre.name}
                        subgenres={genre.subgenres}
                        getGenre={getGenre}
                    />
                })
            }
        </div>
    )    
}

export default GenreList;
