import { ActionTypes } from "../constants/action-types";

export const pageactions = (payload) => {
  return {
    type: ActionTypes.SETPAGEDATA,
    payload: payload,
  };
};
