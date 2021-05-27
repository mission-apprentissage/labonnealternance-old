import React from "react";
import { useDispatch } from "react-redux";

import { push } from "connected-next-router";
import { setFormValues, setShouldExecuteSearch } from "store/actions";

import { pick } from "lodash";
import SearchForm from "components/SearchForTrainingsAndJobs/components/SearchForm";
import WidgetHeader from "components/WidgetHeader/WidgetHeader";

const StartForm = (props) => {

  const dispatch = useDispatch();

  const handleSearchSubmit = (values) => {
    dispatch(setFormValues(pick(values, ['job', 'location', 'radius', 'diploma'])));
    dispatch(setShouldExecuteSearch(true));
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  };

  return <>
    <div className="d-lg-none is-home-true">
      <SearchForm 
        handleSearchSubmit={handleSearchSubmit} 
        isHome={true}
        showResultList={() => {}}
      />
    </div>
    <div className="d-none d-lg-block is-home-true">
      <WidgetHeader
        handleSearchSubmit={handleSearchSubmit} 
      />
    </div>
  </>;
};

export default StartForm;
