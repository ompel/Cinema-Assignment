import React, { Component } from 'react';

class MovieItem extends Component {
  render() {
    console.log(this.props);
    
    return (
      <div className="App">
        <h1>
          {this.props.data.title}
        </h1>
      </div>
    );
  }
}

export default MovieItem;
