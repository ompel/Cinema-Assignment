import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editMovieInfo,
  deleteMovie,
} from '../../redux/actions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
  FormFeedback,
  Alert,
} from 'reactstrap';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MovieItemModal.css';


const ReactSwal = withReactContent(Swal);

class MovieItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.movieID || '',
      title: this.props.movie.title || '',
      year: this.props.movie.year || '',
      runtime: this.props.movie.runtime || '',
      genre: this.props.movie.genre || '',
      director: this.props.movie.director || '',
      poster: this.props.movie.poster || '',
      formValidationTexts: {
        title: '',
        year: '',
        runtime: '',
        genre: '',
        director: '',
      },
      formValidationErrors: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Deep check of equality
    if (!_.isEqual(prevProps.movie, this.props.movie)) {
      this.setState(this.props.movie);
    }
  }

  handleChange = (event) => {
    this.validateField(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ formValidationErrors: false });
    // Final form validation
    _.each(['title', 'year', 'runtime', 'genre', 'director'], (field) => {
      const value = this.state[field];
      if (!this.validateField(field, value)) {
        // The form has validation error, present alert
        this.setState({ formValidationErrors: true });
      }
    });

    if (!this.state.formValidationErrors) {
      // Submit the form
      const movie = {
        title: this.state.title,
        year: this.state.year,
        runtime: this.state.runtime,
        genre: this.state.genre,
        director: this.state.director,
        poster: this.state.poster,
      };
      this.props.editMovieInfo(this.state.id, movie);
      this.props.closeModal();
    }
  }

  deleteSelectedMovie = () => {
    console.log(`Delete movie id: ${this.state.id}`);
    ReactSwal.fire({
      title: 'Delete Movie?',
      html: <p>Are you sure you want to delete: <em>{this.state.title}</em>?</p>,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        /* DELETE MOVIE LOGIC */
      }
    });
  }

  validateField = (field, value) => {
    const numbersRegex = /^[0-9]*$/;
    const alphanumericRegex = /^[a-z0-9 ]+$/i;
    let { formValidationTexts } = this.state;
    // Empty validation
    if (!value) {
      formValidationTexts = {
        ...formValidationTexts,
        [field]: 'This field must not be empty',
      };
    } else {
      formValidationTexts = {
        ...formValidationTexts,
        [field]: '',
      };
      // Field specific validation
      switch (field) {
        case 'runtime':
          // This must contain numbers
          if (!alphanumericRegex.test(value)) {
            formValidationTexts = {
              ...formValidationTexts,
              [field]: 'This field can only contain alphanumeric characters(letters, numbers)',
            };
          }
          break;
        case 'year':
          // This needs to be a number
          if (!numbersRegex.test(value) || (value <= 1000)) {
            formValidationTexts = {
              ...formValidationTexts,
              [field]: 'This field must contain a valid year',
            };
          }
          break;

        default:
          break;
      }
    }
    this.setState({ formValidationTexts });
    if (!this.state.formValidationTexts[field]) {
      // Field is validated
      return true;
    }
    return false;
  }

  render() {
    // This can be true or false. False means new movie
    const editMode = !_.isEmpty(this.state.id);
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.closeModal}>
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          <ModalHeader toggle={this.props.closeModal}>{editMode ? 'Edit Movie' : 'New Movie'}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" name="id" id="movieID" value={this.state.id} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.title)} type="text" name="title" id="movieTitle" value={this.state.title} onChange={this.handleChange} />
              <FormFeedback>{this.state.formValidationTexts.title}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="year">Year</Label>
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.year)} type="text" name="year" id="movieYear" value={this.state.year} onChange={this.handleChange} />
              <FormFeedback>{this.state.formValidationTexts.year}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="runtime">Runtime</Label>
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.runtime)} type="text" name="runtime" id="movieRuntime" value={this.state.runtime} onChange={this.handleChange} />
              <FormFeedback>{this.state.formValidationTexts.runtime}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="genre">Genre</Label>
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.genre)} type="text" name="genre" id="movieGenre" value={this.state.genre} onChange={this.handleChange} />
              <FormFeedback>{this.state.formValidationTexts.genre}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="director">Director</Label>
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.director)} type="text" name="director" id="movieDirector" value={this.state.director} onChange={this.handleChange} />
              <FormFeedback>{this.state.formValidationTexts.director}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="poster">Poster</Label>
              <Input type="text" name="poster" id="moviePoster" value={this.state.poster} onChange={this.handleChange} />
              <small id="posterHelp" className="form-text text-muted">This is not required, although any image URL will work.</small>
            </FormGroup>
            <Alert hidden={!this.state.formValidationErrors} color="danger">
              Please check the fields and try again.
            </Alert>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-center align-items-center w-100">
              <Button className="flex-fill m-2" type="button" color="danger" onClick={this.deleteSelectedMovie}><FontAwesomeIcon icon='trash-alt' /> Delete</Button>
              <Button className="flex-fill m-2" type="submit" color="success"><FontAwesomeIcon icon='save' /> Save</Button>
            </div>
          </ModalFooter>
        </Form>
      </Modal>

    );
  }
}

const mapStateToProps = state => ({
  movieList: state.movies.list,
});

const mapDispatchToProps = {
  editMovieInfo,
  deleteMovie,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieItemModal);
