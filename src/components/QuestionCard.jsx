import React, { Component } from 'react';
import './QuestionCard.css';
import PropTypes from 'prop-types';

const five = 5;
class QuestionCard extends Component {
  state = {
    answer: [],
    classNameWrong: '',
    classNameRight: '',
    nextButton: 'off',
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  wrongOrRight = () => {
    this.setState({
      classNameWrong: 'wrong-question',
      classNameRight: 'correct-question',
      nextButton: 'on',
    });
  };

  clearClass = () => {
    this.setState({
      classNameWrong: '',
      classNameRight: '',
      nextButton: 'off',
    });
  };

  render() {
    const { questions, questionCurrency, nextQuestion } = this.props;
    const { answer, classNameWrong, classNameRight, nextButton } = this.state;

    const allAwnsers = [questions.correct_answer, ...questions.incorrect_answers];

    const randomizeAwnsers = this.shuffleArray(allAwnsers);

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
                data-testid={ conditionalCorrectAnwnser
                  ? 'correct-answer' : `wrong-answer-${questionCurrency}` }
                key={ index }
                onClick={ () => { this.wrongOrRight(); } }
                className={ conditionalCorrectAnwnser ? classNameRight : classNameWrong }
              >
                { conditionalCorrectAnwnser ? questions.correct_answer : element }
              </button>
            );
          })}
          {nextButton === 'on'
            && (
              <button
                data-testid="btn-next"
                onClick={ () => { nextQuestion(); this.clearClass(); } }
                disabled={ questionCurrency >= five }
              >
                Next
              </button>
            )}
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
  questionCurrency: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default QuestionCard;
