import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NoResults.css';

class NoResults extends Component {
  render() {
    return (
      <div className="no-results d-flex justify-content-center align-items-center">
        <div>
          <div className="text-center">
            <FontAwesomeIcon className="pb-4" icon="sad-tear" size="10x" />
          </div>
          <p className="text">No movies were found for this query...</p>
        </div>
      </div>
    );
  }
}

export default NoResults;
