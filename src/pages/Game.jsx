import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <QuestionCard history={ history } />
      </>
    );
  }
}

export default Game;
