import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  editMovieInfo,
  deleteMovieByID,
  addMovie,
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
import async from 'async';
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
      editMode: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!_.isEqual(prevProps.movie, this.props.movie)) {
      // Deep check of equality
      if (!_.isEmpty(this.props.movie)) {
        this.setState({
          ...this.state,
          ...this.props.movie,
          editMode: true,
        });
      } else {
        // New movie mode, reset local state
        this.resetState();
      }
    }
  }

  resetState = () => {
    this.setState({
      ...this.state,
      id: this.props.movieID || '',
      title: this.props.movie.title || '',
      year: this.props.movie.year || '',
      runtime: this.props.movie.runtime || '',
      genre: this.props.movie.genre || '',
      director: this.props.movie.director || '',
      poster: this.props.movie.poster || '',
      editMode: false,
      formValidationErrors: false,
      formValidationTexts: {
        title: '',
        year: '',
        runtime: '',
        genre: '',
        director: '',
      },
    });
  }

  handleChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    let validation = { validate: true, error: '' };
    this.validateField(event.target.name, event.target.value).then(() => {
      this.setState({
        ...this.state,
        formValidationTexts: {
          [field]: '',
        },
      });
    }).catch((error) => {
      validation = { validate: false, error };
      this.setState({
        ...this.state,
        formValidationTexts: {
          ...this.state.formValidationTexts,
          [field]: validation.validate ? '' : validation.error,
        },
      });
    });
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ formValidationErrors: false });
    // Final form validation
    async.each(['title', 'year', 'runtime', 'genre', 'director'], (field, callback) => {
      const value = this.state[field];
      this.validateField(field, value).then((response) => {
        if (response) {
          this.setState({
            ...this.state,
            [field]: response,
          });
        }
        callback();
      }).catch((error) => {
        // The form has validation error, present alert
        this.setState({
          ...this.state,
          formValidationErrors: true,
          formValidationTexts: {
            ...this.state.formValidationTexts,
            [field]: error,
          },
        });
        callback(error);
      });
    }, (error) => {
      if (!error) {
        // Everything is validated!
        // Submit the form
        const movie = {
          title: this.state.title,
          year: this.state.year,
          runtime: this.state.runtime,
          genre: this.state.genre,
          director: this.state.director,
          poster: this.state.poster,
        };
        if (this.state.editMode) {
          this.props.editMovieInfo(this.state.id, movie);
        } else {
          this.props.addMovie(movie);
        }
        this.props.closeModal();
        this.resetState();
      }
    });
  }

  deleteSelectedMovie = () => {
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
        this.props.deleteMovieByID(this.state.id);
        this.props.closeModal();
      }
    });
  }

  validateField = (field, value) => {
    return new Promise((resolve, reject) => {
      const numbersRegex = /^[0-9]*$/;
      const alphanumericRegex = /^[a-z0-9 ]+$/i;
      // Empty validation  
      if (!value) {
        reject('This field must not be empty');
      }
      // Field specific validation
      switch (field) {
        case 'title':
          let title = value.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\b\w/g, l => l.toUpperCase());
          // Check if movie name already exists
          if (!this.state.editMode) {
            _.each(this.props.movieList, (movie) => {
              if (movie.title === title) {
                reject('This movie title already exists')
              }
            });
          }
          resolve(title);
          break;
        case 'runtime':
          // This must contain numbers
          if (!alphanumericRegex.test(value)) {
            reject('This field can only contain alphanumeric characters(letters, numbers)');
          }
          resolve();
          break;
        case 'year':
          // This needs to be a number
          if (!numbersRegex.test(value) || (value <= 1000)) {
            reject('This field must contain a valid year');
          }
          resolve();
          break;
        default:
          resolve();
          break;
      }
    });
  }

  render() {
    // This can be true or false. False means new movie
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.closeModal}>
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          <ModalHeader toggle={this.props.closeModal}>{this.state.editMode ? 'Edit Movie' : 'New Movie'}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" name="id" id="movieID" value={this.state.editMode ? this.state.id : this.props.movieList.length + 1} disabled />
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
              <Button hidden={!this.state.editMode} className="flex-fill m-2" type="button" color="danger" onClick={this.deleteSelectedMovie}><FontAwesomeIcon icon='trash-alt' /> Delete</Button>
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
  deleteMovieByID,
  addMovie,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieItemModal);
