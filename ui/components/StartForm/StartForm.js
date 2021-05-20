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

import { WidgetHeader, InitWidgetSearchParameters } from "components/WidgetHeader";


const StartForm = (props) => {
  const dispatch = useDispatch();
  const { formValues } = useSelector((state) => state.trainings);
  const [domainError, setDomainError] = useState(false);

  const jobChanged = async function (val, setLoadingState) {
    let res = await domainChanged(val, setDomainError);
    setLoadingState("done");
    return res;
  };

  const addressChanged = async function (val, setLoadingState) {
    let res = await fetchAddresses(val);
    setLoadingState("done");
    return res;
  };

  const handleSearchSubmit = (values) => {
    dispatch(setFormValues({ job: values.job, location: values.location }));
    dispatch(setShouldExecuteSearch(true));
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromJobAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("job", item);
    }, 0);

    //updateDiplomaSelectionFromJobChange(item);
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromPlaceAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("location", item);
    }, 0);
  };

  const renderFormik = () => {
    return (
      <div className="card-body c-home-hero__card-body">
        <h1 className="card-title">
          <span className="c-home-hero__title c-home-hero__title1">Se former et travailler</span>
          <span className="c-home-hero__title c-home-hero__title2">&nbsp;en alternance</span>
        </h1>

        <WidgetHeader handleSearchSubmit={() => {}} isHome={true} />

        <p>&nbsp;</p>
      </div>
    );
  };

  return <>{domainError ? <DomainError></DomainError> : renderFormik()}</>;
};

export default StartForm;
