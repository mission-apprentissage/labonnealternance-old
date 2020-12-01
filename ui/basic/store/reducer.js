import { types as actionsTypes } from "./actions";

const initialState = {
  trainings: [],
  jobs: [],
  itemToScrollTo: null,
  selectedItem: null,
  formValues: null,
  extendedSearch: false,
  visiblePane: "resultList",
  isFormVisible: true,
  hasSearch: false,
};

const mainReducer = (state = initialState, action) => {

  console.log("state : ",state);

  // deep copy arg state
  let state_copy = JSON.parse(JSON.stringify(state))
  let res = {}

  if (action.type === actionsTypes.SET_RESULTS) {
    res = {
      trainings: action.trainings,
      jobs: action.jobs,
    };
  } else if (action.type === actionsTypes.SET_TRAININGS) {
    res = {
      ...state_copy,
      trainings: action.trainings,
    };
  } else if (action.type === actionsTypes.SET_JOBS) {
    res = {
      ...state_copy,
      jobs: action.jobs,
    };
  } else if (action.type === actionsTypes.SET_SELECTED_ITEM) {
    res =  {
      ...state_copy,
      selectedItem: action.selectedItem,
    };
  } else if (action.type === actionsTypes.SET_ITEM_TO_SCROLL_TO) {
    res =  {
      ...state_copy,
      itemToScrollTo: action.itemToScrollTo,
    };
  } else if (action.type === actionsTypes.SET_FORM_VALUES) {
    res =  {
      ...state_copy,
      formValues: action.formValues,
    };
  } else if (action.type === actionsTypes.SET_EXTENDED_SEARCH) {
    res =  {
      ...state_copy,
      extendedSearch: action.extendedSearch,
    };
  } else if (action.type === actionsTypes.SET_VISIBLE_PANE) {
    res =  {
      ...state_copy,
      visiblePane: action.visiblePane,
    };
  } else if (action.type === actionsTypes.SET_HAS_SEARCH) {
    res =  {
      ...state_copy,
      hasSearch: action.hasSearch,
    };
  } else if (action.type === actionsTypes.SET_VISIBLE_FORM) {
    res =  {
      ...state_copy,
      visibleForm: action.visibleForm,
    };      
  } else {
    res = state_copy
  }

  return res

};

export { mainReducer,  initialState};
