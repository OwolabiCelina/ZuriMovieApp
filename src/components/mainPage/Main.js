import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from '../home/HomePage';
import MovieDetails from '../movieDetails/MovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path=" " component={HomePage} />
        <Route path="/movie-details" component={MovieDetails} />
      </Routes>
    </Router>
  );
}

export default App;