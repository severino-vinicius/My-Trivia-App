import { ADD_EMAIL,
  ADD_USERNAME, TIMEOUT_GAME,
  SAVE_PLAYER_TIME,
  SAVE_PLAYER_SCORE,
  SAVE_PLAYER_ASSERTIONS } from './actionTypes';

export const addEmail = (userEmail) => ({
  type: ADD_EMAIL,
  payload: userEmail,
});

export const addUserName = (userName) => ({
  type: ADD_USERNAME,
  payload: userName,
});

export const addScore = (userScore) => ({
  type: ADD_SCORE,
  payload: userScore,
});

export const timeOutGame = (timeOut) => ({
  type: TIMEOUT_GAME,
  payload: timeOut,
});

export const saveCountTimer = (count) => ({
  type: SAVE_PLAYER_TIME,
  payload: count,
});

export const savePlayerScore = (score) => ({
  type: SAVE_PLAYER_SCORE,
  payload: score,
});

export const savePlayerAssertions = (assertions) => ({
  type: SAVE_PLAYER_ASSERTIONS,
  payload: assertions,
});
