import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Training from "./Training/reducer";

const appState = {
  trainings: Training,
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    ...appState,
  });
