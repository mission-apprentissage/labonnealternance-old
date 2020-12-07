import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import { fetchAddresses } from "../../services/baseAdresse";
import fetchRomes from "../../services/fetchRomes";
import { DomainError } from "../";
import { push } from "connected-next-router";
import { setFormValues, setShouldExecuteSearch } from "store/actions";

const StartForm = (props) => {
  const dispatch = useDispatch();
  const { formValues } = useSelector((state) => state.trainings);

  const [domainError, setDomainError] = useState(false);

  const domainChanged = async function (val) {
    const res = await fetchRomes(val, () => {
      setDomainError(true);
    });
    return res;
  };

  const handleSubmit = (values) => {
    dispatch(setFormValues({ ...values }));
    dispatch(setShouldExecuteSearch(true));
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  };

  // indique l'attribut de l'objet contenant le texte de l'item sélectionné à afficher
  const autoCompleteToStringFunction = (item) => {
    return item ? item.label : "";
  };

  // Permet de sélectionner un élément dans la liste d'items correspondant à un texte entré au clavier
  const compareAutoCompleteValues = (items, value) => {
    return items.findIndex((element) => element.label.toLowerCase() === value.toLowerCase());
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
      <div className="card-body">
        <h1 className="card-title">
          <span className="d-block c-home-hero__title c-home-hero__title1">Se former et travailler</span>
          <span className="d-block c-home-hero__title c-home-hero__title2">en alternance</span>
        </h1>
        <p className="card-text mb-sm-5">
          <span className="d-block c-home-hero__subtitle">Trouvez la formation et l’entreprise pour</span>
          <span className="d-block c-home-hero__subtitle">réaliser votre projet d'alternance</span>
        </p>

        <Formik
          validate={(values) => {
            const errors = {};
            if (!values.job || !values.job.label || !values.job.romes || !values.job.romes.length > 0) {
              errors.job = "Sélectionnez un domaine proposé";
            }
            if (!values.location || !values.location.label) {
              errors.location = "Sélectionnez un lieu proposé";
            }
            return errors;
          }}
          initialValues={formValues ?? { job: {}, location: {} }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="form-group c-home-hero__input mb-2">
                <AutoCompleteField
                  items={[]}
                  itemToStringFunction={autoCompleteToStringFunction}
                  onSelectedItemChangeFunction={updateValuesFromJobAutoComplete}
                  compareItemFunction={compareAutoCompleteValues}
                  onInputValueChangeFunction={domainChanged}
                  previouslySelectedItem={formValues?.job ?? null}
                  name="jobField"
                  placeholder="ex : boulanger"
                />
                <ErrorMessage name="job" className="u-error-text-color" component="div" />
              </div>
              <div className="form-group c-home-hero__input mb-3 mb-sm-4">
                <AutoCompleteField
                  items={[]}
                  itemToStringFunction={autoCompleteToStringFunction}
                  onSelectedItemChangeFunction={updateValuesFromPlaceAutoComplete}
                  compareItemFunction={compareAutoCompleteValues}
                  onInputValueChangeFunction={fetchAddresses}
                  previouslySelectedItem={formValues?.location ?? null}
                  scrollParentId="rightColumn"
                  name="placeField"
                  placeholder="ex : France, Paris, 75000"
                />
                <ErrorMessage name="location" className="u-error-text-color" component="div" />
              </div>
              <div className="form-group c-home-hero__input">
                <input
                  type="submit"
                  value="C'est parti !"
                  className="d-block btn btn-lg btn-dark w-100 font-weight-bold c-home-hero__submit"
                  data-disable-with="C'est parti !"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
        <p>&nbsp;</p>
      </div>
    );
  };

  return <>{domainError ? <DomainError></DomainError> : renderFormik()}</>;
};

export default StartForm;
