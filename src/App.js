import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
