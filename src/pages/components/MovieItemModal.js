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
  FormFeedback,
} from 'reactstrap';
import _ from 'lodash';
import './MovieItemModal.css';


class MovieItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.movie.id || '',
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
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Deep check of equality
    if (!_.isEqual(prevProps.movie, this.props.movie)) {
      this.setState(this.props.movie);
    }
  }

  handleChange = (event) => {
    this.validateField(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  validateField = (field, value) => {
    // Empty validation
    if (_.isEmpty(value)) {
      this.setState({
        formValidationTexts: {
          ...this.state.formValidationTexts,
          [field]: 'This field must not be empty',
        },
      });
    } else {
      this.setState({
        formValidationTexts: {
          ...this.state.formValidationTexts,
          [field]: '',
        },
      });

      // Field specific validation
      switch (field) {
        case 'runtime':
          // This must contain numbers
          break;
        case 'year':
        // This needs to be a number
        var regex = /[0-9]|\./;
        if (regex.test(value)) {
          console.log('this is a number');
          
        }
        
        default:
          break;
      }
    }
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
              <Input invalid={!_.isEmpty(this.state.formValidationTexts.year)} type="number" name="year" id="movieYear" value={this.state.year} onChange={this.handleChange} />
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
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Do Something</Button>
          </ModalFooter>
        </Form>
      </Modal>

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
