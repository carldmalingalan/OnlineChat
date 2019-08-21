import { NOTIF_CLEAR } from "./types";

export const clearNotif = () => dispatch => {
  dispatch({ type: NOTIF_CLEAR });
};
