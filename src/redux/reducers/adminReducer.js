import { ActionTypes } from "../constants/action-types";

const initialState = { users: [] };

export const User = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        user: action.payload.username,
        token: action.payload.token,
      };
    case ActionTypes.REMOVE_USER:
      return {
        users: [],
      };
    default:
      return state;
  }
};
