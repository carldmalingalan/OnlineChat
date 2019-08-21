import { NOTIF_REGISTER, NOTIF_CLEAR } from "../actions/types";

const initialState = {
  type: null,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIF_REGISTER:
      return {
        type: action.payload.type,
        message: action.payload.message
      };
    case NOTIF_CLEAR:
      return {
        type: null,
        message: null
      };
    default:
      return state;
  }
};
