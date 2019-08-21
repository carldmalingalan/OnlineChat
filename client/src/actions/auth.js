import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_LOADING,
  USER_LOADED,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  NOTIF_REGISTER
} from "./types";
import axios from "axios";

export const getConfig = getState => {
  let config = {
    headers: { "Content-Type": "application/json" }
  };
  const token = getState().auth.token;
  if (token) {
    config.headers["x-auth-token"] = `Bearer ${token}`;
  }

  return config;
};

export const registerUser = UserObj => (dispatch, getState) => {
  axios
    .post("/auth/register", JSON.stringify(UserObj), getConfig(getState))
    .then(result => {
      dispatch({
        type: NOTIF_REGISTER,
        payload: result.data.notif
      });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: result.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: REGISTER_ERROR
      });
    });
};

export const loginUser = UserObj => (dispatch, getState) => {
  axios
    .post("/auth/login", JSON.stringify(UserObj), getConfig(getState))
    .then(result => {
      dispatch({
        type: NOTIF_REGISTER,
        payload: result.data.notif
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data
      });
    })
    .catch(error => {
      dispatch({ type: LOGIN_ERROR });
    });
};
