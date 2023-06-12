import { combineReducers } from "redux";
import { pagereducer } from "./pagereducer";
import { BlogReducer } from "./blogreducer";
import { User } from "./adminReducer";

// import { setCurrentUser } from "../reducers/accountReducer";

export const reducers = combineReducers({
  user: User,
  pagedata: pagereducer,
  comment: BlogReducer,
});
