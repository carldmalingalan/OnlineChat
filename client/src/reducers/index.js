import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import notifReducer from "./notifReducer";

export default combineReducers({
  auth: authReducer,
  notif: notifReducer
});
