import React from 'react';
import './App.css';
import Landing from './homepage/landing'
import Analysis from './rankings/analysis'
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom';

function App() {
  const mainPage = () => {
    return (
      <Landing />
    );
  }

  const rankPage = () => {
    return (
      <Analysis />
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={mainPage} />
        <Route path='/ranks' component={rankPage} />
      </Switch>
    </Router>
  );
}

export default App;
