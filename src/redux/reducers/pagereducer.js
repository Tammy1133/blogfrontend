import { ActionTypes } from "../constants/action-types";

const initialState = {
  pagedata: [],
};

export const pagereducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SETPAGEDATA:
      return { ...state, pagedata: action.payload };
    default:
      return state;
  }
};
