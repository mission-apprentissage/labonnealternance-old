import React, { createContext } from "react";

export const ScopeContext = createContext({
  isTraining: true,
  isJob: true,
});

export function ScopeContextProvider(props) {
  return <ScopeContext.Provider value={props.value}>{props.children}</ScopeContext.Provider>;
}

/*export const useScopeContext = () => React.useContext(ScopeContext);*/
//export default ScopeContext;
