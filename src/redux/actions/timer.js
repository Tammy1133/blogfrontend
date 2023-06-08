import { ActionTypes } from "../constants/action-types";

export const startTime = (data) => {
  return {
    type: ActionTypes.START_TIME,
    payload: data,
  };
};

export const updateSecond = (data) => {
  return {
    type: ActionTypes.UPDATE_SECONDS,
    payload: data,
  };
};
export const updateMinute = (data) => {
  return {
    type: ActionTypes.UPDATE_MINUTE,
    payload: data,
  };
};
export const updateHour = (data) => {
  return {
    type: ActionTypes.UPDATE_HOUR,
    payload: data,
  };
};

export const setTimer = (hr, min) => {
  return {
    type: ActionTypes.SET_TIMER,
    payload: { hr, min },
  };
};
