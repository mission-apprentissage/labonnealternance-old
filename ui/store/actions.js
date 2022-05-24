export const types = {
  SET_SHOULD_EXECUTE_SEARCH: "trainings/SET_SHOULD_EXECUTE_SEARCH",
};

export const setShouldExecuteSearch = (shouldExecuteSearch = true) => {
  return {
    type: types.SET_SHOULD_EXECUTE_SEARCH,
    shouldExecuteSearch,
  };
};
