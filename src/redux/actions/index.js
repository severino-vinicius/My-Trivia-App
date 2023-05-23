import { ADD_EMAIL, ADD_SCORE, ADD_USERNAME } from './actionTypes';

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
