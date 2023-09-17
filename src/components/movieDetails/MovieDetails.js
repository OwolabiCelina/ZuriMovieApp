import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './movie-details.css';


const MovieDetails = () => {

    const [back, setBack]= useState("");
    

    const navigate = useNavigate();
    const location = useLocation()
    const movieData = location.state.data[0]
    // const [movieDetails, setMovieDetails] = useState(null);
    // const [error, setError] = useState(null);

    // const movieId = 'https://api.themoviedb.org/3/find/{external_id}'
    // const apiKey = "6cfc43ab713b0292b2e2b6610ad40c0e"; 

    // useEffect(() =>{
    //   fetch(`https://api.themoviedb.org/3/movie/${movieId}?${apiKey}`)
    //   .then((res) =>{
    //     if(!res.ok){
    //       throw new Error("Failed to fetch movie details");
    //     }
    //     return res.json();
    //   })
    //   .then((data) =>{
    //     const releaseDate = new Date(data.release_date);
    //     const utcDate = releaseDate.toUTCString();
    //     setMovieDetails({
    //       ...data,
    //       release_date: utcDate
    //     });
    //   })
    //   .catch((err) =>{
    //     setError(err.message);
    //   })
    // }, [movieId])

    const handleClick =()=> {
        setBack(back)
        navigate(-1)
    }




  return (
    <div>
        <Header />

    <div className='movie-details-parent-container'>

        <div className='movie-poster-path'>
            <img data-testid="movie-poster"
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}
            alt={`Poster for ghjk`}
        />
        </div>

        <div className='movie-details-container'>
            
            <p data-testid ="movie-title">Title: <span>{movieData.title}</span></p>
            <p data-testid ="movie-release-date">Release Date: <span>{movieData.release_date}</span></p>
            <p data-testid="movie-runtime">Overview: <span>{movieData.overview}</span></p>
            <p data-testid="movie-overview">Runtime: <span>{movieData.runtime}</span></p>
        </div>

        <button className='add-btn' onClick={handleClick}>Go Back</button>

    </div>
    </div>
  )
};

export default MovieDetails;