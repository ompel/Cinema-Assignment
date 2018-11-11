import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/search?s=${this.state.searchQuery}`);
  }

  render() {
    return (
      <div className="Home">
        <Jumbotron>
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">This is a nice assignment written in React.js.</p>
          <hr className="my-2" />
          <p>Feel free to choose from the options below.</p>
          <div className="lead d-flex">
            <Button onClick={() => this.props.history.push('/search?s=marvel')} color="primary" className="m-2">Search Marvel</Button>
            <Button onClick={() => this.props.history.push('/search?s=iron man')} color="primary" className="m-2">Search Iron Man</Button>
            <Form inline onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="search" className="mr-1 ml-2">Free Query:</Label>
                <Input type="text" name="search" id="search" placeholder="Enter a query..." value={this.state.searchQuery} onChange={this.handleChange} />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(Home);
