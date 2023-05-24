import React, { Component } from 'react';
import './QuestionCard.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { savePlayerScore } from '../redux/actions';

const four = 4;
const ten = 10;
class QuestionCard extends Component {
  state = {
    answer: [],
    classNameWrong: '',
    classNameRight: '',
    nextButton: 'off',
  };

  wrongOrRight = (element) => {
    const { questions, dispatch } = this.props;
    this.setState({
      classNameWrong: 'wrong-question',
      classNameRight: 'correct-question',
      nextButton: 'on',
    });
    if (element === questions.correct_answer) {
      const { time } = this.props;
      if (questions.difficulty === 'medium') {
        const count = ten + (time * 2);
        dispatch(savePlayerScore(count));
      }
      if (questions.difficulty === 'easy') {
        const count = ten + (time * 1);
        dispatch(savePlayerScore(count));
      }
      if (questions.difficulty === 'hard') {
        const three = 3;
        const count = ten + (time * three);
        dispatch(savePlayerScore(count));
      }
      console.log(questions.difficulty);
    }
  };

  clearClass = () => {
    this.setState({
      classNameWrong: '',
      classNameRight: '',
      nextButton: 'off',
    });
  };

  render() {
    const { questions,
      questionCurrency, nextQuestion, timeOutGame, randomizerAnwsers } = this.props;
    const { answer,
      classNameWrong,
      classNameRight,
      nextButton,
    } = this.state;

    return (
      <main>
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
          {randomizerAnwsers.map((element, index) => {
            const conditionalCorrectAnwnser = questions.correct_answer === element;
            return (
              <button
                disabled={ timeOutGame }
                data-testid={ conditionalCorrectAnwnser
                  ? 'correct-answer' : `wrong-answer-${questionCurrency}` }
                key={ index }
                onClick={ () => { this.wrongOrRight(element); } }
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
                disabled={ questionCurrency >= four }
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
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  timeOutGame: PropTypes.bool.isRequired,
  randomizerAnwsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  questionCurrency: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(QuestionCard);
