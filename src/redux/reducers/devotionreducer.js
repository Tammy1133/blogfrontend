import { ActionTypes } from "../constants/action-types";

const initialState = {
  devotions: [],
};

export const devotionsreducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DEVOTION_ITEMS:
      return { ...state, devotions: action.payload };
    default:
      return state;
  }
};
