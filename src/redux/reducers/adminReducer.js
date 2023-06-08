import { ActionTypes } from "../constants/action-types";

const initialState = { users: [] };

export const User = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: { _id: action.payload._id },
      };
    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        users: {},
      };
    default:
      return state;
  }
};
