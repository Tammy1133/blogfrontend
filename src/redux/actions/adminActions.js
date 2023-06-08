import { ActionTypes } from "../constants/action-types";

export const addUser = (user) => {
  return {
    type: ActionTypes.ADD_USER,
    payload: user,
  };
};
export const removeuser = () => {
  return {
    type: ActionTypes.REMOVE_USER,
  };
};
