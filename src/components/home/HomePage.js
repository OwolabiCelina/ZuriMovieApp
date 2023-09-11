import React from 'react'
import './homePage.css';
// import Card from '../card/Card';
import Tv from '../../assets/tv.svg';

import { useState, useEffect } from 'react'

const HomePage = () => {

    const [movies, setMovies] = useState([]);

  useEffect(() => {

    const apiKey = '6cfc43ab713b0292b2e2b6610ad40c0e'; 
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const top10Movies = data.results.slice(0, 10);
        setMovies(top10Movies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div>
        <img src={Tv} alt="tv-icon" />
        <h1>MovieBox</h1>
        </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
            className='movie-image'
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
            />
            <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage