import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTokenApi from '../services/tokenApi';
import { addEmail, addUserName } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    userName: '',
    saveBtnDisabbled: true,
  };

  verifyInput = () => {
    const { userName, email } = this.state;
    const minChars = 1;
    const re = /\S+@\S+\.\S+/;
    const validateEmail = re.test(email);
    const validateUserName = userName.length >= minChars;
    this.setState({
      saveBtnDisabbled: !(validateEmail && validateUserName),

    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.verifyInput);
  };

  handleLoginClick = async () => {
    const { userName, email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(addUserName(userName));
    dispatch(addEmail(email));
    const resultTokenApi = await getTokenApi();
    localStorage.setItem('token', resultTokenApi);
    history.push('/Game');
  };

  render() {
    const { email, userName, saveBtnDisabbled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <input
          type="email"
          value={ email }
          name="email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />

        <input
          type="userName"
          value={ userName }
          name="userName"
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />

        <button
          type="button"
          disabled={ saveBtnDisabbled }
          onClick={ this.handleLoginClick }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/Settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
