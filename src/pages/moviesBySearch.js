import React, { Component } from 'react';
import MovieList from './components/MovieList';

class MoviesBySearch extends Component {
  render() {
    console.log(this.props);
    
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

export default MoviesBySearch;
