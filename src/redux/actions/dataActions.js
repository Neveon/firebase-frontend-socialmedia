import {
  SET_THOUGHTS,
  LOADING_DATA,
  LIKE_THOUGHT,
  UNLIKE_THOUGHT
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