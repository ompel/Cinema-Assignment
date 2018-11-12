import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrashAlt,
  faSave,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MoviesBySearch from './pages/MoviesBySearch';
import './App.css';


library.add(faEdit, faTrashAlt, faSave, faPlus, faSearch);

// This is the entry point of the react web app
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
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
