import { ActionTypes } from "../constants/action-types";

export const setBlogItems = (data) => {
  return {
    type: ActionTypes.SET_BLOG_ITEMS,
    payload: data,
  };
};
export const setComments = (data) => {
  return {
    type: ActionTypes.SETCOMMENTS,
    payload: data,
  };
};
