import React, { Component } from 'react';
import MovieList from './components/MovieList';

class PopularMovies extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          This is popular movies
        </h1>
        <MovieList />
      </div>
    );
  }
}

export default PopularMovies;
