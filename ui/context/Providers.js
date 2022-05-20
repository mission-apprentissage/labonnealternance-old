import React from "react";
import SearchResultContextProvider from "./SearchResultContextProvider";
import ParameterContextProvider from "./ParameterContextProvider";

const Providers = ({ children }) => {
  return (
    <SearchResultContextProvider>
      <ParameterContextProvider>{children}</ParameterContextProvider>
    </SearchResultContextProvider>
  );
};

export default Providers;
