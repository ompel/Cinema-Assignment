import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Navbar,
  Nav,
} from 'reactstrap';
import {
  resetMovies,
  setMoviesPage,
  openMovieModal,
  addMovie,
} from '../redux/actions';
import MovieList from './components/MovieList';
import Load from './components/Load';
import './moviesBySearch.css';

const moviesApiURL = 'http://www.omdbapi.com/';
const moviesApiKey = '71cd4388';


class MoviesBySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
      loading: true,
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
      _.each(response.data.Search, (movie) => {
        this.getMovieData(movie.imdbID).then((movieData) => {
          this.props.addMovie(movieData);
        });
      });
      this.setState({
        loading: false,
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
    const currentQuery = this.state.search.s ? this.state.search.s.replace(/\b\w/g, l => l.toUpperCase()) : '';
    if (!this.state.loading) {
      return (
        <div className="MoviesBySearch">
          <Navbar className="fixed-top justify-content-center" color="dark" light expand="lg">
            <Breadcrumb className="mr-auto">
              <BreadcrumbItem><Link to='/'>Herolo React.js Cinema</Link></BreadcrumbItem>
              <BreadcrumbItem active>{`Search: ${currentQuery}`}</BreadcrumbItem>
            </Breadcrumb>
            <Nav className="ml-auto" navbar>
              <Button color="success" onClick={() => this.props.openMovieModal()}>Add new movie</Button>
            </Nav>
          </Navbar>
          <MovieList movieList={this.props.movies} />
        </div>
      );
    }
    return (
      <Load loadingText="Loading..." />
    );
  }
}


const mapStateToProps = state => ({
  movies: state.movies.list,
});

const mapDispatchToProps = {
  resetMovies,
  setMoviesPage,
  openMovieModal,
  addMovie,
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesBySearch));
