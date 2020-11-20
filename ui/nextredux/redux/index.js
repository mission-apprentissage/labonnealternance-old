import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import rootReducer from "./rootReducer";
import isClient from "../services/isClient";

const composeEnhancers =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export const getStoreConfiguration = (preloadedState) => {
  const middlewares = [];

  let history;
  let reducers = {
    init(state, action) {
      return { ...state, ...action.payload };
    },
  };

  if (typeof window !== 'undefined') {
    history = createBrowserHistory();
    reducers.router = connectRouter(history);
    middlewares.push(routerMiddleware(history));
    middlewares.push(thunk);
  }

  return {
    store: createStore(
      combineReducers(reducers),
      preloadedState,
      composeEnhancers(applyMiddleware(...middlewares))
    ),
    history,
  };
};
