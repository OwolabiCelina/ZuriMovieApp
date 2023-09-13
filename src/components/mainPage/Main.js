import React from 'react';
import { Route, Routes} from 'react-router-dom';
import HomePage from '../home/HomePage';
// import MovieDetails from '../movieDetails/MovieDetails';

function App() {
  return (

      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        {/* <Route path="/movie-details" component={MovieDetails} /> */}
      </Routes>

  );
}

export default App;