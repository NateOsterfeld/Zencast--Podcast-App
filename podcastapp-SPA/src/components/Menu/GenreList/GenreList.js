import React from 'react';
import Genre from './Genre/Genre';

const GenreList = ({ genres, getGenre }) => {
    return (
        <div className="genre-container">
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