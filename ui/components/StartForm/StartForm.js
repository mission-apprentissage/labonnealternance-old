import React from "react";
import { useDispatch } from "react-redux";

import { push } from "connected-next-router";
import { setFormValues, setShouldExecuteSearch } from "store/actions";

import SearchForm from "components/SearchForTrainingsAndJobs/components/SearchForm";

const StartForm = (props) => {
  const dispatch = useDispatch();

  const handleSearchSubmit = (values) => {
    console.log('values', values);
    dispatch(setFormValues({ job: values.job, location: values.location, radius: values.radius, diploma: values.diploma }));
    dispatch(setShouldExecuteSearch(true));
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  };

  return <>
      <SearchForm 
        handleSearchSubmit={handleSearchSubmit} 
        showResultList={() => {}}
      />
  </>;
};

export default StartForm;
