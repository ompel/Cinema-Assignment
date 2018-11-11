import React, { Component } from 'react';
import MovieItem from './MovieItem';
import MovieItemModal from './MovieItemModal';
import './MovieList.css';


class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedMovie: {},
    };
  }

  openEditModal = (movie) => {
    this.setState({ modal: true, selectedMovie: movie });
  }

  closeModal = () => {
    this.setState({ modal: false });
  }

  render() {
    const movieList = this.props.movieList.map(movie => (
      <div key={movie.id} className="card-item  m-2" onClick={() => this.openEditModal(movie)}>
        <MovieItem {...movie} />
      </div>
    ));

    return (
      <div>
        <MovieItemModal
          isOpen={this.state.modal}
          closeModal={this.closeModal}
          movie={this.state.selectedMovie} />
        <div className="d-flex flex-row flex-wrap justify-content-center p-2 MovieList">
          {movieList}
        </div>
      </div>
    );
  }
}


export default MovieList;
