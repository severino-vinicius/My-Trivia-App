import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getTriviaRequestApi from '../services/triviaRequestApi';

class QuestionCard extends Component {
  state = {
    responseCode: '',
    questions: [],
    arrayIndex: null,
    answer: [],
  };

  async componentDidMount() {
    const resultApi = await getTriviaRequestApi();
    this.setState({
      responseCode: resultApi.response_code,
      questions: resultApi.results,
      answer: [resultApi.results.correct_answer, resultApi.results.incorrect_answers],
      arrayIndex: resultApi.results.length > 0 ? 0 : null,
    }, this.verifyToken);
    // console.log(this.state);
  }

  verifyToken = () => {
    const { history } = this.props;
    const { responseCode } = this.state;
    const timeLimitToken = 3;
    if (responseCode === timeLimitToken) {
      history.push('/');
    }
  };

  render() {
    const { questions, arrayIndex, answer } = this.state;
    if (arrayIndex === null) {
      return (
        console.log('carregando')
      );
    }
    return (
      <main>
        QuestionCard

        <p data-testid="question-category">
          { questions[arrayIndex].category }
        </p>

        <p data-testid="question-text">
          { questions[arrayIndex].question }
        </p>

        <p>
          { answer }
        </p>

        <div data-testid="answer-options">
          <button data-testid="correct-answer">
            { questions[arrayIndex].correct_answer }
          </button>

          { questions[arrayIndex].incorrect_answers.map((incorrectAnswer, index) => (
            <button key={ index } data-testid={ `wrong-answer-${index}` }>
              { incorrectAnswer }
            </button>
          ))}
        </div>
      </main>
    );
  }
}

QuestionCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default QuestionCard;
