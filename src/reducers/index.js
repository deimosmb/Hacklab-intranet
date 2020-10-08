import { combineReducers } from "redux";
import ParticipantsReducer from "./ParticipantsReducer";
import ProgressReducer from "./ProgressReducer";
import LocationsReducer from "./LocationsReducer";
import FilterReducer from "./FilterReducer";

const rootReducer = combineReducers({
  ParticipantsReducer,
  ProgressReducer,
  LocationsReducer,
  FilterReducer,
});

export default rootReducer;
