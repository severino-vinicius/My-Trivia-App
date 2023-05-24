import React, { Component } from 'react';
import './QuestionCard.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCountTimer,
  savePlayerAssertions,
  savePlayerScore,
  timeOutGame } from '../redux/actions';

const ten = 10;
const milliSecond = 1000;
class QuestionCard extends Component {
  state = {
    answer: [],
    classNameWrong: '',
    classNameRight: '',
    nextButton: 'off',
    time: 0,
  };

  componentDidMount() {
    const seconds = 30;
    this.startTimer(seconds);
  }

  startTimer = (seconds) => {
    this.setState({
      time: seconds,
    });
    const { dispatch } = this.props;
    this.timerID = setInterval(() => {
      const { time } = this.state;
      dispatch(saveCountTimer(time));
      this.setState((prevState) => ({ time: prevState.time - 1 }), () => {
        if (time === 1) {
          clearInterval(this.timerID);
          dispatch(timeOutGame(true));
        }
      });
    }, milliSecond);
  };

  timeReset = () => {
    clearInterval(this.timerID);
    const seconds = 30;
    this.startTimer(seconds);
  };

  wrongOrRight = (element) => {
    const { questions, dispatch } = this.props;
    this.setState({
      classNameWrong: 'wrong-question',
      classNameRight: 'correct-question',
      nextButton: 'on',
    });
    if (element === questions.correct_answer) {
      // dispatch(savePlayerAssertions(1));
      const { time } = this.props;
      if (questions.difficulty === 'medium') {
        const count = ten + (time * 2);
        dispatch(savePlayerScore(count));
        dispatch(savePlayerAssertions(1));
      }
      if (questions.difficulty === 'easy') {
        const count = ten + (time * 1);
        dispatch(savePlayerScore(count));
        dispatch(savePlayerAssertions(1));
      }
      if (questions.difficulty === 'hard') {
        const three = 3;
        const count = ten + (time * three);
        dispatch(savePlayerScore(count));
        dispatch(savePlayerAssertions(1));
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
      questionCurrency, nextQuestion, timeOutGames, randomizerAnwsers } = this.props;
    const { answer,
      classNameWrong,
      classNameRight,
      nextButton,
      time,
    } = this.state;

    return (
      <main>
        <p>
          {time}
        </p>
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
                disabled={ timeOutGames }
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
                onClick={ () => {
                  nextQuestion();
                  this.clearClass();
                  this.timeReset();
                } }
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
  timeOutGames: PropTypes.bool.isRequired,
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
