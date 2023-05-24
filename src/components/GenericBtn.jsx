import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GenericBtn extends Component {
  render() {
    const {
      btnContent,
      btnDataTestid,
      onClickEvent,
      btn,
    } = this.props;

    return (
      <button
        name={ btn }
        type="button"
        data-testid={ btnDataTestid }
        onClick={ onClickEvent }
      >
        { btnContent }
      </button>
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

export default GenericBtn;
