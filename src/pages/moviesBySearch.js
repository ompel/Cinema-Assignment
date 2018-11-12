import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import async from 'async';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Navbar,
  Nav,
  NavbarToggler,
  Collapse,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  resetMovies,
  setMoviesPage,
  openMovieModal,
  addMovie,
} from '../redux/actions';
import MovieList from './components/MovieList';
import Load from './components/Load';
import './MoviesBySearch.css';

const moviesApiURL = 'https://www.omdbapi.com/';
const moviesApiKey = '71cd4388';


class MoviesBySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
      loading: true,
      collapsed: false,
    };
  }

  componentDidMount() {
    const search = queryString.parse(this.props.location.search);
    this.setState({ search });
    this.props.resetMovies();
    this.getMovieList(search.s);
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  // Movies data fetching logic
  getMovieList = (queryString) => {
    axios.get(`${moviesApiURL}`, {
      params: {
        apikey: moviesApiKey,
        s: queryString,
      },
    }).then((response) => {
      async.each(response.data.Search, (movie, callback) => {
        this.getMovieData(movie.imdbID).then((movieData) => {
          this.props.addMovie(movieData);
          callback();
        });
      }, (error) => {
        if (!error) {
          this.setState({
            loading: false,
          });
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
    const currentQuery = this.state.search.s ? this.state.search.s.replace(/\b\w/g, l => l.toUpperCase()) : '';
    if (!this.state.loading) {
      return (
        <div className={`MoviesBySearch d-flex ${this.props.movies.length > 0 ? '' : 'justify-content-center'}`}>
          <Navbar className="fixed-top" color="light" light expand="lg">
            <div className="w-100 d-flex justify-content-between">
              <Breadcrumb className="mr-auto">
                <BreadcrumbItem><Link to='/'>Herolo React.js Cinema</Link></BreadcrumbItem>
                <BreadcrumbItem active>{`Search: ${currentQuery}`}</BreadcrumbItem>
              </Breadcrumb>
              <NavbarToggler onClick={this.toggleNavbar} className="" />
            </div>

            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav className="ml-auto" navbar>
                <Button color="success" onClick={() => this.props.openMovieModal()}><FontAwesomeIcon icon="plus" /> Add new movie</Button>
              </Nav>
            </Collapse>
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
