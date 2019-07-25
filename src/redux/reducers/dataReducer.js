import {
  SET_THOUGHTS,
  LIKE_THOUGHT,
  UNLIKE_THOUGHT,
  LOADING_DATA,
  DELETE_THOUGHT,
  POST_THOUGHT,
  SET_THOUGHT
} from '../types';

const initialState = {
  thoughts: [],
  thought: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_THOUGHTS:
      return {
        ...state,
        thoughts: action.payload,
        loading: false
      };
    case SET_THOUGHT:
      return {
        ...state,
        thought: action.payload
      };
    case LIKE_THOUGHT:
    case UNLIKE_THOUGHT:
      // thought is returned, used to identify
      let index = state.thoughts.findIndex(
        thought => thought.thoughtId === action.payload.thoughtId
      );
      state.thoughts[index] = action.payload; // replaced
      return {
        ...state
      };
    case DELETE_THOUGHT:
      //let index = state.thoughts.findIndex(thought => thought.thoughtId === action.payload);
      return {
        ...state,
        thoughts: state.thoughts.filter(
          thought => thought.thoughtId !== action.payload
        )
      };
    case POST_THOUGHT:
      return {
        ...state,
        thoughts: [action.payload, ...state.thoughts]
      };
    default:
      return state;
  }
}
