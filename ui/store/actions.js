export const types = {
  SET_FORM_VALUES: "trainings/SET_FORM_VALUES",
  SET_VISIBLE_PANE: "trainings/SET_VISIBLE_PANE",
  SET_CURRENT_PAGE: "trainings/SET_CURRENT_PAGE",
  SET_IS_FORM_VISIBLE: "trainings/SET_IS_FORM_VISIBLE",
  SET_SHOULD_EXECUTE_SEARCH: "trainings/SET_SHOULD_EXECUTE_SEARCH",
  SET_SHOULD_MAP_BE_VISIBLE: "trainings/SET_SHOULD_MAP_BE_VISIBLE",
  SET_WIDGET_PARAMETERS: "trainings/SET_WIDGET_PARAMETERS",
  SET_ITEM_PARAMETERS: "trainings/SET_ITEM_PARAMETERS",
  SET_TRAININGS_AND_SELECTED_ITEM: "trainings/SET_TRAININGS_AND_SELECTED_ITEM",
  SET_OPCO_FILTER: "trainings/SET_OPCO_FILTER",
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
