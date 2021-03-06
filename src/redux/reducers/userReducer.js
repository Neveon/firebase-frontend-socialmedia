import {
  SET_USER,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_THOUGHT,
  UNLIKE_THOUGHT,
  MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_THOUGHT:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            thoughtId: action.payload.thoughtId
          }
        ]
      };
    case UNLIKE_THOUGHT:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.thoughtId !== action.payload.thoughtId
        )
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notif => (notif.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
};
