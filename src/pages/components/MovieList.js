import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import async from 'async';
import queryString from 'query-string'
import { appendMovies, setMoviesPage, setMoviesGenres } from '../../redux/actions';
import MovieItem from './MovieItem';


const moviesApiURL = `http://www.omdbapi.com/`;
const moviesApiKey = '71cd4388';

class MovieList extends Component {
  componentWillMount() {
    this.getMovieList(this.props.search.s);
  }

  // Movies data fetching logic
  getMovieList = (queryString) => {
    axios.get(`${moviesApiURL}`, {
      params: {
        apikey: moviesApiKey,
        s: queryString,
      },
    }).then((response) => {
      // const movies = {};
      const movies = [];

      async.each(response.data.Search, (movie, callback) => {
        this.getMovieData(movie.imdbID).then((movieData) => {
          // movies[movie.imdbID] = movieData;
          const movieItem = <MovieItem key={movie.imdbID} data={movieData} />;
          movies.push(movieItem);
          callback();
        }).catch((error) => {
          callback(error);
        });
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          // Appending the movies to the redux store
          this.props.appendMovies(movies);
        }
      });
    }).catch((e) => {
      // in case of any error fetching the movie list
      console.log(e);
    });
  }

  getMovieData = (imdbID) => {
    return new Promise((resolve, reject) => {
      axios.get(moviesApiURL, {
        params: {
          apikey: moviesApiKey,
          i: imdbID,
        },
      }).then((movieData) => {
        const {
          Title,
          Released,
          Runtime,
          Genre,
          Director,
          Poster,
        } = movieData.data;
        resolve({
          title: Title,
          year: new Date(Released).getFullYear(),
          runtime: Runtime,
          genre: Genre,
          director: Director,
          poster: Poster,
        });
      }).catch((e) => {
        reject(e);
      });
    });
  };

  render() {
    return (
      <div className="MovieList">
        {this.props.movies}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.list,
  search: queryString.parse(state.router.location.search),
});

const mapDispatchToProps = {
  appendMovies,
  setMoviesPage,
  setMoviesGenres,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieList);
