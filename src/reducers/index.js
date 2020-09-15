import { combineReducers } from "redux";
import ParticipantsReducer from "./ParticipantsReducer";
import ProgressReducer from "./ProgressReducer";

const rootReducer = combineReducers({
  ParticipantsReducer,
  ProgressReducer,
});

export default rootReducer;
