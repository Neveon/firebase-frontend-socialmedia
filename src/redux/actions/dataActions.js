import {
  SET_THOUGHTS,
  LOADING_DATA,
  LIKE_THOUGHT,
  UNLIKE_THOUGHT,
  DELETE_THOUGHT,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_THOUGHT,
  SET_THOUGHT,
  STOP_LOADING_UI
} from '../types';
import axios from 'axios';

// Get all thoughts
export const getThoughts = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/thoughts')
    .then(res => {
      dispatch({
        type: SET_THOUGHTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_THOUGHTS,
        payload: []
      });
    });
};

// Get details of one user's thought
export const getThought = thoughtId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/thought/${thoughtId}`)
    .then(res => {
      dispatch({
        type: SET_THOUGHT,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post thought
export const postThought = newThought => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/thought', newThought)
    .then(res => {
      dispatch({
        type: POST_THOUGHT,
        payload: res.data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

// Like a thought
export const likeThought = thoughtId => dispatch => {
  axios
    .get(`/thought/${thoughtId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_THOUGHT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Unlike a thought
export const unlikeThought = thoughtId => dispatch => {
  axios
    .get(`/thought/${thoughtId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_THOUGHT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Delete thought
export const deleteThought = thoughtId => dispatch => {
  axios
    .delete(`/thought/${thoughtId}`)
    .then(() => {
      dispatch({
        type: DELETE_THOUGHT,
        payload: thoughtId
      });
    })
    .catch(err => console.log(err));
};

// Clear errors - Fixes bug where error on submit post does not clear from state
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
