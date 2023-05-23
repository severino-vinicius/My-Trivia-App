import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getTokenApi from '../services/tokenApi';

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
    const { history } = this.props;
    const resultTokenApi = await getTokenApi();
    localStorage.setItem('token', resultTokenApi);
    history.push('/Game');
  };

  handleSettingsClick = () => {
    const { history } = this.props;
    history.push('/Settings');
  };

  render() {
    const { email, userName, saveBtnDisabbled } = this.state;
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
          onClick={ this.handleSettingsClick }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
