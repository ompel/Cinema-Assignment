import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="App">
        <h1>
          404!
      </h1>
        <h3>
          Unfortunately this page cannot be found
        </h3>
        <h4><Link to="/">Return to safety</Link></h4>
      </div>
    );
  }
}

export default withRouter(NotFound);
