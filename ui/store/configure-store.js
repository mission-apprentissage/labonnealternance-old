import { createStore, applyMiddleware, combineReducers } from "redux";
import { createRouterMiddleware, initialRouterState, routerReducer } from "connected-next-router";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import Router from "next/router";
import { mainReducer } from "./reducer";
import { GTMPageView } from "utils/gtm";

const handleRouteChange = (url) => GTMPageView(url);

const appState = {
  trainings: mainReducer,
};

const bindMiddleware = (middleware) => {
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware));
};

const combinedReducer = combineReducers({
  router: routerReducer,
  ...appState,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== "undefined" && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
      // trigger
      handleRouteChange(state.router.location.pathname);
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const initStore = (context) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath),
    };
  }
  return createStore(reducer, initialState, bindMiddleware([routerMiddleware]));
};

export const wrapper = createWrapper(initStore);
