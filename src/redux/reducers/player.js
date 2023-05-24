import { ADD_EMAIL,
  ADD_USERNAME,
  TIMEOUT_GAME,
  SAVE_PLAYER_TIME,
  SAVE_PLAYER_SCORE,
  SAVE_PLAYER_ASSERTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timeOutGame: false,
  time: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case ADD_USERNAME:
    return { ...state, name: action.payload };
  case TIMEOUT_GAME:
    return { ...state, timeOutGames: action.payload };
  case SAVE_PLAYER_TIME:
    return { ...state, time: action.payload };
  case SAVE_PLAYER_SCORE:
    return { ...state, score: state.score + action.payload };
  case SAVE_PLAYER_ASSERTIONS:
    return { ...state, assertions: state.assertions + action.payload };
  default:
    return state;
  }
};

export default playerReducer;
