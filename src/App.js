import React, { Component } from 'react';
import PopularMovies from './pages/popularMovies';
import './App.css';


// This is the entry point of the react web app
class App extends Component {
  render() {
    return (
      <div className="App">
        <PopularMovies />
      </div>
    );
  }
}

export default App;
