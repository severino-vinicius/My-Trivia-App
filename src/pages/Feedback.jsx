import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertionsRedux } = this.props;
    const verifyScore = 3;
    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          { assertionsRedux >= verifyScore ? 'Well Done!' : 'Could be better...' }
        </h3>
      </section>
    );
  }
}

Feedback.propTypes = {
  assertionsRedux: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertionsRedux: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
