import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import NotFound from './pages/notFound';
import Home from './pages/home';
import MoviesBySearch from './pages/moviesBySearch';
import './App.css';


library.add(faEdit, faTrashAlt, faSave);

// This is the entry point of the react web app
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <header>Herolo React.js Cinema</header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={() => <MoviesBySearch />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
