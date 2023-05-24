import { ADD_EMAIL, ADD_SCORE, ADD_USERNAME, TIMEOUT_GAME } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  timeOutGame: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, gravatarEmail: action.payload };
  case ADD_USERNAME:
    return { ...state, name: action.payload };
  case ADD_SCORE:
    return { ...state, score: action.payload };
  case TIMEOUT_GAME:
    return { ...state, timeOutGame: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
