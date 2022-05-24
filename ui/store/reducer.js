import { types as actionsTypes } from "./actions";

const initialState = {
  shouldExecuteSearch: false,
  shouldMapBeVisible: false,
};

const mainReducer = (state = initialState, action) => {
  //console.log("state : ", state);

  // deep copy arg state
  let state_copy = JSON.parse(JSON.stringify(state));
  let res = {};

  if (action.type === actionsTypes.SET_HAS_SEARCH) {
    res = {
      ...state_copy,
      hasSearch: action.hasSearch,
    };
  } else if (action.type === actionsTypes.SET_SHOULD_MAP_BE_VISIBLE) {
    res = {
      ...state_copy,
      shouldMapBeVisible: action.shouldMapBeVisible,
    };
  } else {
    res = state_copy;
  }

  return res;
};

export { mainReducer, initialState };
