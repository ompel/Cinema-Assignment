import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Jumbotron,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      emptyAlert: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  handleSubmit = () => {
    if (this.state.searchQuery === '') {
      this.setState({ emptyAlert: true });
    } else {
      this.props.history.push(`/search?s=${this.state.searchQuery}`);
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div className="Home h-100">
        <div className="container d-flex flex-column justify-content-center">
          <div className="row text-center">
            <Jumbotron className="col-12 mb-0 pb-0">
              <h1 className="display-3">Welcome!</h1>
              <p className="lead">This is a nice assignment written in React.js.</p>
              <hr className="my-2 pb-5" />
              <p>Feel free to choose from the options below.</p>
            </Jumbotron>
          </div>
          <div className="row justify-content-center">
            <div className="input-group mb-3 col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Type your query"
                value={this.state.searchQuery}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  <FontAwesomeIcon icon="search" />
                </button>
              </div>
            </div>
          </div>
          <div hidden={!this.state.emptyAlert} className="row justify-content-center">
            <div className="alert alert-danger col-6 text-center" role="alert">
              This field cannot be empty
            </div>
          </div>
          <div className="row justify-content-center">
            <Button outline onClick={() => this.props.history.push('/search?s=marvel')} color="dark" className="m-2" size="md">Search Marvel</Button>
            <Button outline onClick={() => this.props.history.push('/search?s=iron man')} color="dark" className="m-2" size="md">Search Iron Man</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
