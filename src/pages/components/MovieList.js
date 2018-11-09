import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appendMovies, setMoviesPage, setMoviesGenres } from '../../redux/actions';
import axios from 'axios';
import _ from 'lodash';
import PopularMovies from '../popularMovies';

const moviesApiURL = 'https://api.themoviedb.org/3/';
const moviesApiAuth = '?api_key=ea46fe4f2bcb9f24399b54ace4a51ec9';

const moviesPopularEndpoint = 'movie/popular';
const moviesGenresEndpoint = 'genre/movie/list';
const movieInfoEndpoint = `movie/`;

class MovieList extends Component {
  componentWillMount() {
    this.getMoviesGenres()
        .then(this.getMovies());
  }

  // Movies data fetching logic
  getMoviesGenres = async () => {
    await axios.get(`${moviesApiURL}${moviesGenresEndpoint}${moviesApiAuth}`).then((response) => {
      this.props.setMoviesGenres(response.data.genres);
    });
  }

  getMovies = () => {
    axios.get(`${moviesApiURL}${moviesPopularEndpoint}${moviesApiAuth}`).then((response) => {
      let movies = [];
      _.each(response.data.results, (movie) => {
        // We need to fetch each movie's runtime
        axios.get(`${moviesApiURL}${movieInfoEndpoint}${movie.id}${moviesApiAuth}`).then((movieInfo) => {
          console.log(movieInfo.data.runtime);
          let movieData = movieInfo.data
          
          // Append each movie to the movies array as a custom object
          let movie = {
            id: movieData.id,
            title: movieData.title,
            year: movieData.release_date,
            runtime: movieData.runtime,
            genre: movieData.genre,
            director: movieData.director,
          }
        })
        console.log(movie);
      });
      // this.props.setMoviesPage(response.data.page, response.data.total_pages);
      // this.props.appendMovies(response.data.results);
    });
  }

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
  mapDispatchToProps
)(MovieList);
