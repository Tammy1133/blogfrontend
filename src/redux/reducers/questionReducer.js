import { ActionTypes } from "../constants/action-types";

const initialState = {
  questionnumber: 0,
  questions: [],
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_QUESTION:
      return { ...state, questionnumber: action.payload };
    case ActionTypes.SET_QUESTION:
      return { ...state, questions: action.payload };
    case ActionTypes.UPDATE_STUDENT_ANSWER:
      return {
        ...state,
        questions: state.questions.map((item) => {
          if (
            item.question === state.questions[state.questionnumber].question
          ) {
            return { ...item, studentAnswer: action.payload };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
