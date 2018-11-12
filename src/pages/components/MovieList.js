import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  openMovieModal,
  closeMovieModal,
} from '../../redux/actions';
import MovieItem from './MovieItem';
import MovieItemModal from './MovieItemModal';
import NoResults from '../components/NoResults';

class MovieList extends Component {

  openEditModal = (id) => {
    let movie = {
      ...this.props.movieList[id],
      id,
    }
    this.props.openMovieModal(movie);
  }

  render() {
    const movieList = this.props.movieList.map((movie, id) => (
      <div key={id} className="card-item  m-2" onClick={() => this.openEditModal(id)}>
        <MovieItem {...movie} />
      </div>
    ));

    return (
      <div className="d-flex">
        <MovieItemModal
          isOpen={this.props.modal}
          closeModal={this.props.closeMovieModal}
          movie={this.props.selectedModalMovie} />
        <div className="d-flex flex-row flex-wrap justify-content-center p-2 MovieList">
          {movieList.length > 0 ? movieList : <NoResults /> }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  movieList: state.movies.list,
  modal: state.movies.movieModal,
  selectedModalMovie: state.movies.selectedModalMovie,
});

const mapDispatchToProps = {
  openMovieModal,
  closeMovieModal,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
