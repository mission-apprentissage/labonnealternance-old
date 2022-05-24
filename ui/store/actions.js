export const types = {
  SET_SHOULD_EXECUTE_SEARCH: "trainings/SET_SHOULD_EXECUTE_SEARCH",
  SET_SHOULD_MAP_BE_VISIBLE: "trainings/SET_SHOULD_MAP_BE_VISIBLE",
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
