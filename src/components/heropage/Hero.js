import React from 'react'
import HomePage from "../home/HomePage";
import {MovieContext} from '.././home/HomePage';
import MovieCard from "../card/MovieCard"
// import { createContext, useState } from "react";

const Hero = () => {
    // const [movieData, setMovieData] =  useState([]); 

  return (
    <div>
        <HomePage />
        <MovieCard />
    </div>
  )
}

export default Hero