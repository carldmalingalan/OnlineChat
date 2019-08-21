import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  USER_LOADING
} from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      };
    default:
      return state;
  }
};
