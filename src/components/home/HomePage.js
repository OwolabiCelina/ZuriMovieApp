import React from 'react'
import './homePage.css';
import MovieCard from "../card/MovieCard"
import axios from "axios";
import Header from '../header/Header';
import { Link, useNavigate } from'react-router-dom';
import { useState, useEffect} from 'react'
import {FaHeart} from 'react-icons/fa'


const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();

    const apiKey = "6cfc43ab713b0292b2e2b6610ad40c0e"; 
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const searchUrl = 'https://api.themoviedb.org/3/search/movie';


  useEffect(() => {

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const top10Movies = data.results.slice(0, 10);
        console.log("logging top 10 movies")
        console.log(top10Movies);
        setMovies(top10Movies);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleFormChange = (event) => {
    event.preventDefault()
      const value = event.target.value;
      setMovieName(value)
      console.log(movieName);
  }

  const moveSearchMovieData = (id) => {
    let getMovieData = searchResult.filter((searchResult) => searchResult.id === id);
    navigate("/movie-details", {state: {data: getMovieData}});
  }

  const moveDefaultMovieData = (id) => {
    let getMovieData = movies.filter((movies) => movies.id === id);
    navigate("/movie-details", {state: {data: getMovieData}});
  }

  const searchMovie = async (e) => {
    e.preventDefault();
    if (movieName === "") {
      alert("Fields Cannot be Empty")
      return
    }

    try {
      const response = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: movieName,
          language: 'en-US',
          page: 1,
        },
      });

      if (response.status === 200) {
        const searchResult = response.data.results;
        setSearchResult(searchResult);
        
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const addToFavorites = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    if (movieToAdd) {
      setFavorites((prevFavorites) => [...prevFavorites, movieToAdd]);
      console.log('Added to favorites:', movieToAdd.title);

    }
  };

  return (
    <div>
      <Header />
        <form>
        <div className="detect-form">
            <input
              value={movieName}
              name="detect-field"
              onChange={handleFormChange}
              placeholder="Search for a movie..."
            />
            <button onClick={searchMovie}>Search Movie</button>
          </div>
        </form>

        <div className="movie-list">
        {searchResult.length !== 0 ? (
          searchResult.map((movie) => (

            <div onClick={ () => moveSearchMovieData(movie.id)}>
            <MovieCard className="movie-card-con"
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              imgSrc={movie.poster_path}
            />
            <div className='btn-icon-container'>
              <button className='fave-btn' onClick={() => addToFavorites(movie.id)}>Add to Favorites</button>
              <FaHeart  color="red" size={"20em"} width={"10rem"} height="20rem"/>
              </div>
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <div onClick={ () => moveDefaultMovieData(movie.id)}>
            <MovieCard
              key={movie.id}
              id = {movie.id}
              title={movie.title}
              date={movie.release_date}
              imgSrc={movie.poster_path}
            />
             <div className='btn-icon-container'>
              <button className='fave-btn' onClick={() => addToFavorites(movie.id)}>Add to Favorites</button>
              <FaHeart color='white' />
             </div>
            </div>            
          ))
        )}
        
      </div>
            {/* <div>
            <h2>Favorite Movies</h2>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
            </div> */}
    </div>
  )
}

export default HomePage;