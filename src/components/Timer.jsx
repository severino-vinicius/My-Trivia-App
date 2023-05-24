// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { saveCountTimer, timeOutGame } from '../redux/actions';

// const milliSecond = 1000;
// class Timer extends Component {
//   state = {
//     time: 30,
//   };

//   componentDidMount() {
//     this.startTimer();
//   }

//   startTimer = () => {
//     const { dispatch } = this.props;
//     const timerID = setInterval(() => {
//       const { time } = this.state;
//       dispatch(saveCountTimer(time));
//       this.setState((prevState) => ({ time: prevState.time - 1 }), () => {
//         if (time === 0) {
//           clearInterval(timerID);
//           dispatch(timeOutGame(true));
//         }
//       });
//     }, milliSecond);
//   };

//   render() {
//     const { time } = this.state;
//     return (
//       <div>
//         <p>
//           { time }
//         </p>
//       </div>
//     );
//   }
// }
// Timer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

// export default connect()(Timer);
