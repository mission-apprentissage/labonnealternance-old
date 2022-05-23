import { types as actionsTypes } from "./actions";

const initialState = {
  formValues: null,
  visiblePane: "resultList",
  currentPage: "",
  isFormVisible: true,
  shouldExecuteSearch: false,
  shouldMapBeVisible: false,
  widgetParameters: null,
};

const mainReducer = (state = initialState, action) => {
  //console.log("state : ", state);

  // deep copy arg state
  let state_copy = JSON.parse(JSON.stringify(state));
  let res = {};

  if (action.type === actionsTypes.SET_FORM_VALUES) {
    res = {
      ...state_copy,
      formValues: action.formValues,
    };
  } else if (action.type === actionsTypes.SET_VISIBLE_PANE) {
    res = {
      ...state_copy,
      visiblePane: action.visiblePane,
    };
  } else if (action.type === actionsTypes.SET_CURRENT_PAGE) {
    res = {
      ...state_copy,
      currentPage: action.currentPage,
    };
  } else if (action.type === actionsTypes.SET_HAS_SEARCH) {
    res = {
      ...state_copy,
      hasSearch: action.hasSearch,
    };
  } else if (action.type === actionsTypes.SET_IS_FORM_VISIBLE) {
    res = {
      ...state_copy,
      isFormVisible: action.isFormVisible,
    };
  } else if (action.type === actionsTypes.SET_SHOULD_EXECUTE_SEARCH) {
    res = {
      ...state_copy,
      shouldExecuteSearch: action.shouldExecuteSearch,
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
