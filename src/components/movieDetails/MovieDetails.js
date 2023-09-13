import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';


const MovieDetails = () => {

    const apiKey = "6cfc43ab713b0292b2e2b6610ad40c0e"; 
     const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    // const apiUrl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1' 

    const [movieDetails, setMovieDetails] = useState(null)

    const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          if (response.status === 200) {
            setMovieDetails(response.data);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
      
      useEffect(() => {
        fetchData(); 
      }, []);


  return (
    <div>
        <Header />
        {
        movieDetails === null ? (
            <p>Loading movie details...</p>
        ) : (
            <div className='movie-info-container'>
                <div className='movie-pics'>
                    <img src={movieDetails.poster_path} alt="" />
                </div>
                <div className='movie-info'>
                <p>Title:</p>
                <span><em>{movieDetails.Title}</em></span>
                <p>Release Date:</p>
                <span><em>{movieDetails.ReleaseDate}</em></span>
                <p>Rutime:</p>
                <span><em>{movieDetails.Runtime}</em></span>
                <p>Overview:</p>
                <span><em>{movieDetails.Overview}</em></span>
                </div>
            </div>
        )}
        <button>Back</button>
    </div>
  )
};

export default MovieDetails;