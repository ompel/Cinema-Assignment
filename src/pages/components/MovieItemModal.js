import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import _ from 'lodash';


class MovieItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: this.props.movie.id || '',
        title: this.props.movie.title || '',
        year: this.props.movie.year || '',
        runtime: this.props.movie.runtime || '',
        genre: this.props.movie.genre || '',
        director: this.props.movie.director || '',
        poster: this.props.movie.poster || '',
      },
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Deep check of equality
    if (!_.isEqual(prevProps.movie, this.props.movie)) {
      this.setState({ movie: this.props.movie });
    }
  }

  handleChange = (event) => {
    this.setState({ movie: { [event.target.name]: event.target.value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    // This can be true or false. False means new movie
    const editMode = !_.isEmpty(this.state.movie);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Modal isOpen={this.props.isOpen} toggle={this.props.closeModal}>
          <ModalHeader toggle={this.props.closeModal}>{editMode ? 'Edit Movie' : 'New Movie'}</ModalHeader>
          <ModalBody>
          <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" name="id" id="movieID" value={this.state.movie.id} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="movieTitle" value={this.state.movie.title} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="year">Year</Label>
              <Input type="number" name="year" id="movieYear" value={this.state.movie.year} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="runtime">Runtime</Label>
              <Input type="text" name="runtime" id="movieRuntime" value={this.state.movie.runtime} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="genre">Genre</Label>
              <Input type="text" name="genre" id="movieGenre" value={this.state.movie.genre} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="director">Director</Label>
              <Input type="text" name="director" id="movieDirector" value={this.state.movie.director} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="poster">Poster</Label>
              <Input type="text" name="poster" id="moviePoster" value={this.state.movie.poster} onChange={this.handleChange} />
              <small id="posterHelp" className="form-text text-muted">This is not required, although any image URL will work.</small>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Do Something</Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  editModal: state.movies.editModal,
  movieID: state.movies.modalMovieID,
  movieList: state.movies.list,
});

const mapDispatchToProps = {
};

MovieItemModal = withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieItemModal));

export default MovieItemModal;
