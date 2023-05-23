import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import getTriviaRequestApi from '../services/triviaRequestApi';

class Game extends Component {
  state = {
    questions: [],
    responseCode: null,
    questionCurrency: 0,
  };

  async componentDidMount() {
    const resultApi = await getTriviaRequestApi();
    console.log(resultApi);
    this.setState({
      questions: resultApi.results,
    }, this.verifyToken());
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
    const { questions, questionCurrency } = this.state;
    const { history } = this.props;
    console.log(questions);
    console.log(!questions.length > 0);
    return (
      <>
        <Header />
        {!questions.length > 0 ? (<p> Loading </p>)
          : (
            <QuestionCard
              history={ history }
              questions={ questions[questionCurrency] }
              questionCurrency={ questionCurrency }
            />)}

      </>
    );
  }
}

export default Game;
