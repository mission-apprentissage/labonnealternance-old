const initialState = {};

const mainReducer = (state = initialState, action) => {
  //console.log("state : ", state);

  // deep copy arg state
  let state_copy = JSON.parse(JSON.stringify(state));
  let res = {};

  res = state_copy;

  return res;
};

export { mainReducer, initialState };
