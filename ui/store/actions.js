export const types = {
  SET_VISIBLE_PANE: "trainings/SET_VISIBLE_PANE",
  SET_CURRENT_PAGE: "trainings/SET_CURRENT_PAGE",
  SET_IS_FORM_VISIBLE: "trainings/SET_IS_FORM_VISIBLE",
  SET_SHOULD_EXECUTE_SEARCH: "trainings/SET_SHOULD_EXECUTE_SEARCH",
  SET_SHOULD_MAP_BE_VISIBLE: "trainings/SET_SHOULD_MAP_BE_VISIBLE",
  SET_TRAININGS_AND_SELECTED_ITEM: "trainings/SET_TRAININGS_AND_SELECTED_ITEM",
  SET_OPCO_FILTER: "trainings/SET_OPCO_FILTER",
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
