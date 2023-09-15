import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './movie-details.css';


const MovieDetails = () => {

    const [back, setBack]= useState("");
    const [utcTime, setUtcTime] = useState(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
    

    const navigate = useNavigate();
    const [utcReleaseDate, setUtcReleaseDate] = useState('');
    const location = useLocation()
    const movieData = location.state.data[0]

    const handleClick =()=> {
        setBack(back)
        navigate(-1)
    }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setUtcTime(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
    }, 1000);

    return () => clearInterval (intervalId);
  }, []);

  useEffect(() => {
    const releaseDate = new Date(movieData.release_date);
    const utcReleaseDateString = releaseDate.toISOString();
    setUtcReleaseDate(utcReleaseDateString);
  }, [movieData.release_date]);



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
            <p data-testid ="movie-release-date">Release Date: <span>{utcReleaseDate}</span></p>
            <p data-testid="movie-runtime">Overview: <span>{movieData.overview}</span></p>
            <p data-testid="movie-overview">Runtime: <span>{utcTime}</span></p>
        </div>

        <button className='add-btn' onClick={handleClick}>Go Back</button>

    </div>
    </div>
  )
};

export default MovieDetails;