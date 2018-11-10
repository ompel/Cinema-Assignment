import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h2>This is the home page</h2>
        <p>
          Feel free to choose between Marvel and Iron Man
        </p>
        <button type='button' onClick={() => this.props.history.push('/search?s=marvel')}>Search Marvel</button>
        <button type='button' onClick={() => this.props.history.push('/search?s=iron man')}>Search Iron Man</button>
      </div>
    );
  }
}

export default withRouter(Home);
