import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import getTriviaRequestApi from '../services/triviaRequestApi';

const five = 5;
class Game extends Component {
  state = {
    questions: [],
    questionCurrency: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const getTokenLs = localStorage.getItem('token');
    const invalidToken = 3;
    try {
      const resultApi = await getTriviaRequestApi(getTokenLs);
      const { response_code: responseCode, results } = resultApi;
      if (responseCode === invalidToken) {
        localStorage.removeItem('token');
        history.push('/');
      }
      this.setState({
        questions: results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion = () => {
    const { questionCurrency } = this.state;
    if (questionCurrency < five) {
      // Atualiza o estado incrementando em 1
      this.setState({
        questionCurrency: questionCurrency + 1,
      });
    }
  };

  render() {
    const { questions, questionCurrency } = this.state;
    const { history } = this.props;
    return (
      <>
        <Header />
        {!questions.length > 0 ? (<p> Loading </p>)
          : (
            <QuestionCard
              history={ history }
              questions={ questions[questionCurrency] }
              questionCurrency={ questionCurrency }
              nextQuestion={ this.nextQuestion }
            />)}

      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
