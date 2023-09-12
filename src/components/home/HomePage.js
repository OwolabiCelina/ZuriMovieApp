import React from 'react'
import './homePage.css';
import MovieCard from "../card/MovieCard"
import axios from "axios";
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react'

const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState("");
    const [searchResult, setSearchResult] = useState([])

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

  const movieId = `https://api.themoviedb.org/3/find/{external_id}`;

  const handleMovieClick =(movieId) =>{
    navigate(`../movie-details/${movieId}`);

  }

  const detectLanguage = async (e) => {
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

  //    try {
  //     let dataDetails = await axios.get(searchUrl);
  //     if (dataDetails.status === 200){
  //        console.log(`consoling search ${dataDetails.data.Search}`);
  //       const searchResults = dataDetails.data.results;
  //       setSearchResult(searchResult)
  //        if (dataDetails.data.searchResult !== undefined){
  //           setSearchResult(dataDetails.data.searchResult);       
  //        }else{
  //         alert("No Movies for " + movieName + " Found")
  //        }
         
  //     }
  //    }catch(err){
  //     console.log(err.message)
  //    }

  // }

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
            <button onClick={detectLanguage}>Search Movie</button>
          </div>
        </form>

        <div className="movie-list">
        {searchResult.length !== 0 ? (
          searchResult.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              imgSrc={movie.poster_path}
              onClick={handleMovieClick}
            />
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              imgSrc={movie.poster_path}
              onClick={handleMovieClick}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage