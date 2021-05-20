import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import {
  AutoCompleteField,
  compareAutoCompleteValues,
  autoCompleteToStringFunction,
} from "components/AutoCompleteField/AutoCompleteField";
import { fetchAddresses } from "services/baseAdresse";
import domainChanged from "services/domainChanged";
import { DomainError } from "../";
import { push } from "connected-next-router";
import { setFormValues, setShouldExecuteSearch } from "store/actions";
import glassImage from "public/images/glass.svg";
import localisationImage from "public/images/localisation.svg";
import { SendTrackEvent } from "utils/gtm";
import SearchForm from "components/SearchForTrainingsAndJobs/components/SearchForm";

const StartForm = (props) => {
  const dispatch = useDispatch();

  const handleSearchSubmit = (values) => {
    dispatch(setFormValues({ job: values.job, location: values.location }));
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
