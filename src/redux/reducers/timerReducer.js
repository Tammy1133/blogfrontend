import { ActionTypes } from "../constants/action-types";
const initialState = {
  timerStarted: false,
  hour: 0,
  minute: 0,
  second: 0,
};

export const TimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_TIME:
      return { ...state, timerStarted: action.payload };
    case ActionTypes.SET_TIMER:
      return { ...state, hour: action.payload.hr, minute: action.payload.min };
    case ActionTypes.UPDATE_HOUR:
      return { ...state, hour: action.payload };
    case ActionTypes.UPDATE_MINUTE:
      return { ...state, minute: action.payload };
    case ActionTypes.UPDATE_SECONDS:
      return { ...state, second: action.payload };

    default:
      return state;
  }
};
