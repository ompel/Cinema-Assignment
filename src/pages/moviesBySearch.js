import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import async from 'async';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { resetMovies, appendMovies, setMoviesPage, setMoviesGenres } from '../redux/actions';
import MovieList from './components/MovieList';

const moviesApiURL = `http://www.omdbapi.com/`;
const moviesApiKey = '71cd4388';


class MoviesBySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {}
    };
  }

  componentDidMount() {
    const search = queryString.parse(this.props.location.search);
    this.setState({ search });
    this.props.resetMovies();
    this.getMovieList(search.s);
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
          // const movieItem = <MovieItem key={movie.imdbID} data={movieData} />;
          movies.push(movieData);
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
          id: imdbID,
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
      <div className="MoviesBySearch">
        <h1>
          Now showing movies by the search query: {this.state.search.s}
        </h1>
        <MovieList movieList={this.props.movies} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  movies: state.movies.list,
});

const mapDispatchToProps = {
  resetMovies,
  appendMovies,
  setMoviesPage,
  setMoviesGenres,
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesBySearch));
