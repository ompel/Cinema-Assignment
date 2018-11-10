import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import async from 'async';
import { appendMovies, setMoviesPage, setMoviesGenres } from '../../redux/actions';
import PopularMovies from '../popularMovies';


const moviesApiURL = `http://www.omdbapi.com/`;
const moviesApiKey = '71cd4388';
const moviesSearchQuery = 'iron man';

class MovieList extends Component {
  componentWillMount() {
    this.getMovieList();
  }

  // Movies data fetching logic
  getMovieList = () => {
    axios.get(`${moviesApiURL}`, {
      params: {
        apikey: moviesApiKey,
        s: moviesSearchQuery,
      },
    }).then((response) => {
      const movies = {};
      async.each(response.data.Search, (movie, callback) => {
        this.getMovieData(movie.imdbID).then((movieData) => {
          movies[movie.imdbID] = movieData;
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
          console.log(movies);
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
      <div className="App">
        <h1>
          MOVIES
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
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
