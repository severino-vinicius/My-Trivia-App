import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GenericBtn from '../components/GenericBtn';

class Ranking extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <GenericBtn
            btnContent="Inicio"
            btnDataTestid="btn-go-home"
          />
        </Link>
      </section>
    );
  }
}

GenericBtn.propTypes = {
  btnContent: PropTypes.string.isRequired,
  btnDataTestid: PropTypes.string,
  onClickEvent: PropTypes.func,
  btn: PropTypes.string,
};

GenericBtn.defaultProps = {
  btnDataTestid: '',
  btn: '',
  onClickEvent: () => '',
};

export default Ranking;
