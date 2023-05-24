import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/Game" component={ Game } />
      <Route path="/Settings" component={ Settings } />
      <Route path="/Feedback" component={ Feedback } />
    </Switch>
  );
}
