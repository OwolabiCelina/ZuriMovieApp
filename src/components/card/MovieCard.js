import React from 'react';
// import './Card.css';

const MovieCard = ({title, date, imgSrc}) => {

  return (
    <div data-testid="movie-poster" className="movie-card">
      <img data-testid="movie-poster"
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500/${imgSrc}`}
        alt={`Poster for ghjk`}
      />
      <div className="movie-details">
        <h2 data-testid ="movie-title">{title}</h2>
        <p data-testid="movie-release-date">Release Date: {date}</p>
      </div>
    </div>
  );
};

export default MovieCard;