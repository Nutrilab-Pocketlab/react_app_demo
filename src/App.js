// All credit goes to Adrian from JavaScript Mastery, and his beginner 1h Reach course at https://www.youtube.com/watch?v=b9eMGE7QtTk

import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

// API URL with key
const API_URL = "http://www.omdbapi.com?apikey=109cc320";

const App = () => {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  // async function, because it may take some time to fetch the data. With async, react knows not to expect immediate response
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>Movieland</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      { movies?.length > 0 
          ? (
            <div className="container">
              { movies.map((movie) => (<MovieCard movie={movie}/>)) }
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;