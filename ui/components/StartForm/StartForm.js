import React from "react";
import { useDispatch } from "react-redux";

import { push } from "connected-next-router";
import { setShouldExecuteSearch } from "../../store/actions";

import { ParameterContext } from "../../context/ParameterContextProvider";

import { pick } from "lodash";
import SearchForm from "../../components/SearchForTrainingsAndJobs/components/SearchForm";
import WidgetHeader from "../../components/WidgetHeader/WidgetHeader";

const StartForm = (props) => {
  const dispatch = useDispatch();

  const { setFormValues } = React.useContext(ParameterContext);

  const handleSearchSubmit = ({ values }) => {
    setFormValues(pick(values, ["job", "location", "radius", "diploma"]));
    dispatch(setShouldExecuteSearch(true));
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  };

  const handleSearchSubmitFunction = (values) => {
    return handleSearchSubmit({ values });
  };

  return (
    <>
      <div className="d-lg-none">
        <SearchForm handleSearchSubmit={handleSearchSubmitFunction} isHome={true} showResultList={() => {}} />
      </div>
      <div className="d-none d-lg-block">
        <WidgetHeader handleSearchSubmit={handleSearchSubmit} isHome={true} />
      </div>
    </>
  );
};

export default StartForm;
