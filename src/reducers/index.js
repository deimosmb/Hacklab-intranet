import { combineReducers } from "redux";
import ParticipantsReducer from "./ParticipantsReducer";
import ProgressReducer from "./ProgressReducer";
import LocationsReducer from "./LocationsReducer";

const rootReducer = combineReducers({
  ParticipantsReducer,
  ProgressReducer,
  LocationsReducer,
});

export default rootReducer;
