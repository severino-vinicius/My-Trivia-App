import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getTriviaRequestApi from '../services/triviaRequestApi';

class QuestionCard extends Component {
  state = {
    responseCode: '',
    questions: [],
    arrayIndex: 0,
    answer: [],
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {
    const { questions, questionCurrency } = this.props;
    const { arrayIndex, answer } = this.state;

    console.log(questions);
    console.log(questions);
    const allAwnsers = [questions.correct_answer, ...questions.incorrect_answers];

    const randomizeAwnsers = this.shuffleArray(allAwnsers);
    console.log(randomizeAwnsers);

    return (
      <main>
        QuestionCard

        <p data-testid="question-category">
          { questions.category }
        </p>

        <p data-testid="question-text">
          { questions.question }
        </p>

        <p>
          { answer }
        </p>

        <div data-testid="answer-options">
          {randomizeAwnsers.map((element, index) => {
            const conditionalCorrectAnwnser = questions.correct_answer === element;
            return (
              <button
                data-testid={ conditionalCorrectAnwnser ? "correct-answer" : `wrong-answer-${questionCurrency}` }
                key={ index }
              >
                { conditionalCorrectAnwnser ? questions.correct_answer : element }
              </button>
            );
          })}
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
