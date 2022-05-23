import React, { createContext, useReducer } from "react";

const initialState = {
  formValues: null,
  visiblePane: "resultList",
  currentPage: "",
  isFormVisible: true,
  shouldExecuteSearch: false,
  shouldMapBeVisible: false,
  widgetParameters: null,
  itemParameters: null,
  opcoFilter: null,
};

const actions = {
  SET_FORM_VALUES: "SET_FORM_VALUES",
  SET_VISIBLE_PANE: "SET_VISIBLE_PANE",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_IS_FORM_VISIBLE: "SET_IS_FORM_VISIBLE",
  SET_SHOULD_EXECUTE_SEARCH: "SET_SHOULD_EXECUTE_SEARCH",
  SET_SHOULD_MAP_BE_VISIBLE: "SET_SHOULD_MAP_BE_VISIBLE",
  SET_WIDGET_PARAMETERS: "SET_WIDGET_PARAMETERS",
  SET_ITEM_PARAMETERS: "SET_ITEM_PARAMETERS",
  SET_OPCO_FILTER: "SET_OPCO_FILTER",
};

const reducer = (state, action) => {
  let state_copy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case actions.SET_FORM_VALUES: {
      return { ...state_copy, formValues: action.formValues };
    }
    case actions.SET_VISIBLE_PANE: {
      return { ...state_copy, visiblePane: action.visiblePane };
    }
    case actions.SET_CURRENT_PAGE: {
      return { ...state_copy, currentPage: action.currentPage };
    }
    case actions.SET_IS_FORM_VISIBLE: {
      return { ...state_copy, isFormVisible: action.isFormVisible };
    }
    case actions.SET_SHOULD_EXECUTE_SEARCH: {
      return { ...state_copy, shouldExecuteSearch: action.shouldExecuteSearch };
    }
    case actions.SET_SHOULD_MAP_BE_VISIBLE: {
      return { ...state_copy, shouldMapBeVisible: action.shouldMapBeVisible };
    }
    case actions.SET_WIDGET_PARAMETERS: {
      return { ...state_copy, widgetParameters: action.widgetParameters };
    }
    case actions.SET_ITEM_PARAMETERS: {
      return { ...state_copy, itemParameters: action.itemParameters };
    }
    case actions.SET_OPCO_FILTER: {
      return { ...state_copy, opcoFilter: action.opcoFilter };
    }

    default:
      return state;
  }
};

export const ParameterContext = createContext();

const ParameterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setFormValues: (formValues = null) => {
      dispatch({ type: actions.SET_FORM_VALUES, formValues });
    },
    setVisiblePane: (visiblePane = "resultList") => {
      dispatch({ type: actions.SET_VISIBLE_PANE, visiblePane });
    },
    setCurrentPage: (currentPage = "") => {
      dispatch({ type: actions.SET_CURRENT_PAGE, currentPage });
    },
    setIsFormVisible: (isFormVisible = true) => {
      dispatch({ type: actions.SET_IS_FORM_VISIBLE, isFormVisible });
    },
    setShouldExecuteSearch: (shouldExecuteSearch = false) => {
      dispatch({ type: actions.SET_SHOULD_EXECUTE_SEARCH, shouldExecuteSearch });
    },
    setShouldMapBeVisible: (shouldMapBeVisible = false) => {
      dispatch({ type: actions.SET_SHOULD_MAP_BE_VISIBLE, shouldMapBeVisible });
    },
    setWidgetParameters: (widgetParameters = null) => {
      dispatch({ type: actions.SET_WIDGET_PARAMETERS, widgetParameters });
    },
    setItemParameters: (itemParameters = null) => {
      dispatch({ type: actions.SET_ITEM_PARAMETERS, itemParameters });
    },
    setOpcoFilter: (opcoFilter = null) => {
      dispatch({ type: actions.SET_OPCO_FILTER, opcoFilter });
    },
  };

  return <ParameterContext.Provider value={value}>{children}</ParameterContext.Provider>;
};

export default ParameterContextProvider;
