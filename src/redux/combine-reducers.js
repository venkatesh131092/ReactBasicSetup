import { combineReducers } from "redux";
import cssReducer from "./css-reducer";
import { templatesReducer } from "../appModules/manage-templates/reducer";

export default asyncReducers =>
  combineReducers({
    ...asyncReducers,
    templatesReducer,
    cssReducer
  });
