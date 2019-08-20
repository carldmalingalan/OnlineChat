import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_LOADING,
  USER_LOADED,
  REGISTER_ERROR,
  REGISTER_SUCCESS
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
      console.log(result);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR
      });
    });
};
