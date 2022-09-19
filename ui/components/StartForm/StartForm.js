import React, { useState, createContext, useContext } from "react";

import { useRouter } from "next/router";

import { DisplayContext } from "../../context/DisplayContextProvider";
import { ParameterContext } from "../../context/ParameterContextProvider";

import { pick } from "lodash";
import SearchForm from "../../components/SearchForTrainingsAndJobs/components/SearchForm";
import WidgetHeader from "../../components/WidgetHeader/WidgetHeader";

export const WishContext = createContext()

const StartForm = (props) => {
  const router = useRouter();

  const { setFormValues } = useContext(DisplayContext);
  const { setShouldExecuteSearch } = useContext(ParameterContext);

  const handleSearchSubmit = ({ values }) => {
    setFormValues(pick(values, ["job", "location", "radius", "diploma"]));
    setShouldExecuteSearch(true);
    router.push("/recherche-apprentissage");
  };

  const handleSearchSubmitFunction = (values) => {
    return handleSearchSubmit({ values });
  };

  const [locationRadius, setLocationRadius] = useState(30);


  return (
    <>
      <WishContext.Provider value={{locationRadius}}>
        <div className="d-lg-none">
          <SearchForm handleSearchSubmit={handleSearchSubmitFunction} 
                        isHome={true} 
                        showResultList={() => {}}
                        />
        </div>
        <div className="d-none d-lg-block">
          <WidgetHeader handleSearchSubmit={handleSearchSubmit} 
            isHome={true} 
            />
        </div>
      </WishContext.Provider>
    </>
  );
};

export default StartForm;
