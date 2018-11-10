import React, { Component } from 'react';
import MovieItem from './MovieItem';
import './MovieList.css';


class MovieList extends Component {
  render() {
    return (
      <div className="d-flex flex-row flex-wrap justify-content-center p-2 MovieList">
        {this.props.movieList.map((movie) => { return <MovieItem key={movie.id} {...movie} />; })}
      </div>
    );
  }
}

export default MovieList;
