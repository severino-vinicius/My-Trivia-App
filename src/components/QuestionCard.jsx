import React, { Component } from 'react';
import './QuestionCard.css';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  state = {
    answer: [],
    classNameWrong: '',
    classNameRight: '',
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  wrongOrRight = () => this.setState({
    classNameWrong: 'wrong-question',
    classNameRight: 'correct-question',
  });

  render() {
    const { questions, questionCurrency } = this.props;
    const { answer, classNameWrong, classNameRight } = this.state;

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
};

export default QuestionCard;
