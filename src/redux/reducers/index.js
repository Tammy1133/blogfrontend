import { combineReducers } from "redux";
import { pagereducer } from "./pagereducer";
import { BlogReducer } from "./blogreducer";

// import { setCurrentUser } from "../reducers/accountReducer";

export const reducers = combineReducers({
  pagedata: pagereducer,
  comment: BlogReducer,
});
