import { ActionTypes } from "../constants/action-types";

export const setQuestionNumber = (data) => {
  return {
    type: ActionTypes.SET_CURRENT_QUESTION,
    payload: data,
  };
};
export const setQuestions = (data) => {
  return {
    type: ActionTypes.SET_QUESTION,
    payload: data,
  };
};
export const updateStudentAnswer = (data) => {
  return {
    type: ActionTypes.UPDATE_STUDENT_ANSWER,
    payload: data,
  };
};
