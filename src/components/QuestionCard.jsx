import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getTriviaRequestApi from '../services/triviaRequestApi';

class QuestionCard extends Component {
  state = {
    responseCode: '',
    questions: [],
    // arrayIndex: 0,
  };

  async componentDidMount() {
    const resultApi = await getTriviaRequestApi();
    this.setState({
      responseCode: resultApi.response_code,
      questions: resultApi.results,

      // Aqui tentei fazer a question receber seus respectivos itens, pois
      // achei que daria pra fazer o questions[arrayIndex].category
      // porém da erro pois o valor inicial é um [], e não consegui fazer
      // ele esperar a resposta da api pra rodar

      // questions: resultApi.results.map((question) => ({
      //   category: question.category,
      //   type: question.type,
      //   difficulty: question.difficulty,
      //   question: question.question,
      //   correctAnswer: question.correct_answer,
      //   incorrectAnswers: question.incorrect_answers,
      // })),
    }, this.verifyToken);
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
    const { questions } = this.state;
    // console.log(questions[arrayIndex].category);
    return (
      <main>
        QuestionCard
        <div>
          {questions.map((question, index) => (
            <div key={ index }>
              <p data-testid="question-category">
                { question.category }
              </p>
              <p data-testid="question-text">
                { question.question }
              </p>
              <button data-testid="correct-answer">
                { question.correct_answer }
              </button>
              { question.incorrect_answers.map((incorrectAnswer, index2) => (
                <button key={ index2 } data-testid={ `wrong-answer-${index2}` }>
                  { incorrectAnswer }
                </button>
              ))}
            </div>
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
