import React from 'react'
import './homePage.css';
import MovieCard from "../card/MovieCard"
import Tv from '../../assets/tv.svg';
import axios from "axios";
// import { useNavigate } from 'react-router-dom';

import { useState, useEffect} from 'react'

const HomePage = () => {

    const [movies, setMovies] = useState([]);
    const [movieName, setMovieName] = useState("");

    // console.log("consoling movies");
    // console.log(console.log(movies));

    // const navigate = useNavigate("./movie-details");

    const apiKey = "6cfc43ab713b0292b2e2b6610ad40c0e"; 
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

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


  const detectLanguage = async (e) => {
    e.preventDefault();
    if (movieName === "") {
      alert("Fields Cannot be Empty")
      return
    }

     try {
      let dataDetails = await axios(apiUrl);
      if (dataDetails.status === 200){
         console.log(`consoling search ${dataDetails.data.Search}`);
         if (dataDetails.data.Search !== undefined){
            setMovieName(dataDetails.data.Search);       
         }else{
          alert("No Movies for " + movieName + " Found")
         }
         
      }
     }catch(err){
      console.log(err.message)
     }

  }

  return (
    <div>
      <div>
        <img src={Tv} alt="tv-icon" />
        <h1>MovieBox</h1>
        </div>
        <form>
        <div className="detect-form">
            <input
              value={movieName}
              name="detect-field"
              onChange={handleFormChange}
              placeholder="Search for a movie..."
            />
            <button onClick={detectLanguage}>Get Movie Info
            </button>
          </div>
        </form>

      <div className="movie-list">
        
         {movies.map((movie) => (
          <MovieCard
          key={movie.id}
          title = {movie.title}
          date = {movie.release_date}
          imgSrc= {movie.backdrop_path}
          />
        ))} 
      </div>
    </div>
  )
}

export default HomePage