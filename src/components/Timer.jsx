import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeOutGame } from '../redux/actions';

class Timer extends Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  startTimer = () => {
    const milliSecond = 1000;
    const { time } = this.state;
    const { dispatch } = this.props;
    const timerID = setInterval(() => {
      if (time === 0) {
        dispatch(timeOutGame(true));
      } else {
        this.setState((prevstate) => ({ time: prevstate.time - 1 }));
      }
    }, milliSecond);
  };

  render() {
    const { time } = this.state;
    return (
      <div>
        <p>
          { time }
        </p>
      </div>
    );
  }
}

export default connect()(Timer);
