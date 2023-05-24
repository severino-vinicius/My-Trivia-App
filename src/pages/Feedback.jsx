import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertionsRedux, scorePlayerRedux } = this.props;
    const verifyScore = 3;
    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          { assertionsRedux >= verifyScore ? 'Well Done!' : 'Could be better...' }
        </h3>
        <div>
          <p>
            Você acertou
          </p>
          <p data-testid="feedback-total-question">
            { assertionsRedux }
          </p>
          <p>
            questões!
          </p>
          <p>
            Um total de
          </p>
          <p data-testid="feedback-total-score">
            { scorePlayerRedux }
          </p>
          <p>
            pontos.
          </p>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  assertionsRedux: PropTypes.number,
  scorePlayerRedux: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertionsRedux: state.player.assertions,
  scorePlayerRedux: stateRedux.player.score,
});

export default connect(mapStateToProps)(Feedback);
