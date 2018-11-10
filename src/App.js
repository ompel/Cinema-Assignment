import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import MoviesBySearch from './pages/moviesBySearch';
import NotFound from './pages/notFound';
import Home from './pages/home';
import './App.css';


// This is the entry point of the react web app
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
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
