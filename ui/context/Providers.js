import React from "react";
import SearchResultContextProvider from "./SearchResultContextProvider";
import ParameterContextProvider from "./ParameterContextProvider";
import DisplayContextProvider from "./DisplayContextProvider";

const Providers = ({ children }) => {
  return (
    <SearchResultContextProvider>
      <ParameterContextProvider>
        <DisplayContextProvider>{children}</DisplayContextProvider>
      </ParameterContextProvider>
    </SearchResultContextProvider>
  );
};

export default Providers;
