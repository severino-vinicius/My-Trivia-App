import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';

class QuestionCard extends Component {
  state = {
    answer: [],
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {
    const { questions, questionCurrency, timeOutGame } = this.props;
    const { answer } = this.state;

    const allAwnsers = [questions.correct_answer, ...questions.incorrect_answers];

    const randomizeAwnsers = this.shuffleArray(allAwnsers);

    return (
      <main>
        QuestionCard
        <Timer />
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
                disabled={ timeOutGame }
                data-testid={ conditionalCorrectAnwnser
                  ? 'correct-answer' : `wrong-answer-${questionCurrency}` }
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
  questions: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  timeOutGame: PropTypes.bool.isRequired,
  questionCurrency: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(QuestionCard);
