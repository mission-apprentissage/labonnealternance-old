import React, { createContext, useReducer } from "react";

const initialState = {
  trainings: [],
  jobs: [],
  itemToScrollTo: null,
  selectedItem: null,
  extendedSearch: false,
  hasSearch: false,
  selectedMapPopupItem: null,
};

const actions = {
  SET_RESULTS: "SET_RESULTS",
  SET_TRAININGS: "SET_TRAININGS",
  SET_JOBS: "SET_JOBS",
  SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
  SET_ITEM_TO_SCROLL_TO: "SET_ITEM_TO_SCROLL_TO",
  SET_EXTENDED_SEARCH: "SET_EXTENDED_SEARCH",
  SET_HAS_SEARCH: "SET_HAS_SEARCH",
  SET_TRAININGS_AND_SELECTED_ITEM: "SET_TRAININGS_AND_SELECTED_ITEM",
  SET_SELECTED_MAP_POPUP_ITEM: "SET_SELECTED_MAP_POPUP_ITEM",
};

const reducer = (state, action) => {
  let state_copy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case actions.SET_RESULTS: {
      return {
        ...state_copy,
        trainings: action.trainings,
        jobs: action.jobs,
      };
    }
    case actions.SET_TRAININGS: {
      return { ...state_copy, trainings: action.trainings };
    }
    case actions.SET_JOBS: {
      return { ...state_copy, jobs: action.jobs };
    }
    case actions.SET_SELECTED_ITEM: {
      return { ...state_copy, selectedItem: action.selectedItem };
    }
    case actions.SET_TRAININGS_AND_SELECTED_ITEM: {
      return { ...state_copy, selectedItem: action.selectedItem, trainings: action.trainings };
    }
    case actions.SET_ITEM_TO_SCROLL_TO: {
      return { ...state_copy, itemToScrollTo: action.itemToScrollTo };
    }
    case actions.SET_HAS_SEARCH: {
      return { ...state_copy, hasSearch: action.hasSearch };
    }
    case actions.SET_SELECTED_MAP_POPUP_ITEM: {
      return { ...state_copy, selectedMapPopupItem: action.selectedMapPopupItem };
    }
    case actions.SET_EXTENDED_SEARCH: {
      return { ...state_copy, extendedSearch: action.extendedSearch };
    }

    default:
      return state;
  }
};

export const SearchResultContext = createContext();

const SearchResultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setResults: (trainings = [], jobs = []) => {
      dispatch({ type: actions.SET_RESULTS, trainings, jobs });
    },
    setTrainings: (trainings = []) => {
      dispatch({ type: actions.SET_TRAININGS, trainings });
    },
    setJobs: (jobs = []) => {
      dispatch({ type: actions.SET_JOBS, jobs });
    },
    setSelectedItem: (selectedItem = null) => {
      dispatch({ type: actions.SET_SELECTED_ITEM, selectedItem });
    },
    setSelectedMapPopupItem: (selectedMapPopupItem = null) => {
      dispatch({ type: actions.SET_SELECTED_MAP_POPUP_ITEM, selectedMapPopupItem });
    },
    setTrainingsAndSelectedItem: (trainings = [], selectedItem = null) => {
      dispatch({ type: actions.SET_TRAININGS_AND_SELECTED_ITEM, trainings, selectedItem });
    },
    setItemToScrollTo: (itemToScrollTo = null) => {
      dispatch({ type: actions.SET_ITEM_TO_SCROLL_TO, itemToScrollTo });
    },
    setExtendedSearch: (extendedSearch = false) => {
      dispatch({ type: actions.SET_EXTENDED_SEARCH, extendedSearch });
    },
    setHasSearch: (hasSearch = false) => {
      dispatch({ type: actions.SET_HAS_SEARCH, hasSearch });
    },
  };

  return <SearchResultContext.Provider value={value}>{children}</SearchResultContext.Provider>;
};

export default SearchResultContextProvider;



/*
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



  export const types = {
    SET_FORM_VALUES: "trainings/SET_FORM_VALUES",    
    SET_VISIBLE_PANE: "trainings/SET_VISIBLE_PANE",
    SET_CURRENT_PAGE: "trainings/SET_CURRENT_PAGE",
    SET_IS_FORM_VISIBLE: "trainings/SET_IS_FORM_VISIBLE",
    SET_SHOULD_EXECUTE_SEARCH: "trainings/SET_SHOULD_EXECUTE_SEARCH",
    SET_SHOULD_MAP_BE_VISIBLE: "trainings/SET_SHOULD_MAP_BE_VISIBLE",
    SET_WIDGET_PARAMETERS: "trainings/SET_WIDGET_PARAMETERS",
    SET_ITEM_PARAMETERS: "trainings/SET_ITEM_PARAMETERS",
    SET_OPCO_FILTER: "trainings/SET_OPCO_FILTER",
  };
  export const setShouldExecuteSearch = (shouldExecuteSearch = true) => {
  return {
    type: types.SET_SHOULD_EXECUTE_SEARCH,
    shouldExecuteSearch,
  };
};

export const setShouldMapBeVisible = (shouldMapBeVisible = false) => {
  return {
    type: types.SET_SHOULD_MAP_BE_VISIBLE,
    shouldMapBeVisible,
  };
};

export const setWidgetParameters = (widgetParameters = true) => {
  return {
    type: types.SET_WIDGET_PARAMETERS,
    widgetParameters,
  };
};

export const setItemParameters = (itemParameters = true) => {
  return {
    type: types.SET_ITEM_PARAMETERS,
    itemParameters,
  };
};

export const setOpcoFilter = (opcoFilter = null) => {
  return {
    type: types.SET_OPCO_FILTER,
    opcoFilter,
  };
};
export const setFormValues = (formValues = null) => {
  return {
    type: types.SET_FORM_VALUES,
    formValues,
  };
};

export const setVisiblePane = (visiblePane = "resultList") => {
  return {
    type: types.SET_VISIBLE_PANE,
    visiblePane,
  };
};

export const setCurrentPage = (currentPage = "") => {
  return {
    type: types.SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setIsFormVisible = (isFormVisible = true) => {
  return {
    type: types.SET_IS_FORM_VISIBLE,
    isFormVisible,
  };
};

*/

/*
export const setResults = (trainings = [], jobs = []) => {
  return {
    type: types.SET_RESULTS,
    trainings,
    jobs,
  };
};

export const setTrainings = (trainings = []) => {
  return {
    type: types.SET_TRAININGS,
    trainings,
  };
};

export const setJobs = (jobs = []) => {
  return {
    type: types.SET_JOBS,
    jobs,
  };
};

export const setSelectedItem = (selectedItem = null) => {
  return {
    type: types.SET_SELECTED_ITEM,
    selectedItem,
  };
};

export const setSelectedMapPopupItem = (selectedMapPopupItem = null) => {
  return {
    type: types.SET_SELECTED_MAP_POPUP_ITEM,
    selectedMapPopupItem,
  };
};

export const setTrainingsAndSelectedItem = (trainings = [], selectedItem = null) => {
  return {
    type: types.SET_TRAININGS_AND_SELECTED_ITEM,
    selectedItem,
    trainings,
  };
};

export const setItemToScrollTo = (itemToScrollTo = null) => {
  return {
    type: types.SET_ITEM_TO_SCROLL_TO,
    itemToScrollTo,
  };
};


export const setExtendedSearch = (extendedSearch = false) => {
  return {
    type: types.SET_EXTENDED_SEARCH,
    extendedSearch,
  };
};



export const setHasSearch = (hasSearch = false) => {
  return {
    type: types.SET_HAS_SEARCH,
    hasSearch,
  };
};
*/

/*
const mainReducer = (state = initialState, action) => {
  //console.log("state : ", state);

  // deep copy arg state
  
  let res = {};

  
  } else if (action.type === actions.SET_FORM_VALUES) {
    res = {
      ...state_copy,
      formValues: action.formValues,
    };
  } else if (action.type === actions.SET_VISIBLE_PANE) {
    res = {
      ...state_copy,
      visiblePane: action.visiblePane,
    };
  } else if (action.type === actions.SET_CURRENT_PAGE) {
    res = {
      ...state_copy,
      currentPage: action.currentPage,
    };
  } else if (action.type === actions.SET_IS_FORM_VISIBLE) {
    res = {
      ...state_copy,
      isFormVisible: action.isFormVisible,
    };
  } else if (action.type === actions.SET_SHOULD_EXECUTE_SEARCH) {
    res = {
      ...state_copy,
      shouldExecuteSearch: action.shouldExecuteSearch,
    };
  } else if (action.type === actions.SET_SHOULD_MAP_BE_VISIBLE) {
    res = {
      ...state_copy,
      shouldMapBeVisible: action.shouldMapBeVisible,
    };
  } else if (action.type === actions.SET_WIDGET_PARAMETERS) {
    res = {
      ...state_copy,
      widgetParameters: action.widgetParameters,
    };
  } else if (action.type === actions.SET_ITEM_PARAMETERS) {
    res = {
      ...state_copy,
      itemParameters: action.itemParameters,
    };

  
  } else if (action.type === actions.SET_OPCO_FILTER) {
    res = {
      ...state_copy,
      opcoFilter: action.opcoFilter,
    };
  } else {
    res = state_copy;
  }

  return res;
};
*/