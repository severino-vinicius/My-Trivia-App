import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <QuestionCard />
      </>
    );
  }
}

export default Game;
