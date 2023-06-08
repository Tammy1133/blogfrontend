import { ActionTypes } from "../constants/action-types";

const initialState = {
  comment: { name: "", password: "" },
};

export const BlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SETCOMMENTS:
      return { ...state, comment: action.payload };
    default:
      return state;
  }
};
