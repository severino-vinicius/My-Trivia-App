import React, { Component } from 'react';

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
          // onClick={  }
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
