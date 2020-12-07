import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Row, Col, Input } from "reactstrap";
import mapMarker from "../../public/images/icons/pin.svg";
import { Formik, Form, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import { fetchAddresses } from "../../services/baseAdresse";
import fetchRomes from "../../services/fetchRomes";
import { DomainError } from "../";

const StartForm = (props) => {
  const { formValues } = useSelector((state) => state.trainings);

  const [domainError, setDomainError] = useState(false);

  const domainChanged = async function (val) {
    const res = await fetchRomes(val, () => {
      setDomainError(true);
    });
    return res;
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
        onSubmit={props.handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Row>
              <Col xs="12">
                <div className="formGroup">
                  <label htmlFor="jobField">Votre projet est dans le domaine ...</label>
                  <div className="fieldContainer">
                    <AutoCompleteField
                      items={[]}
                      itemToStringFunction={autoCompleteToStringFunction}
                      onSelectedItemChangeFunction={updateValuesFromJobAutoComplete}
                      compareItemFunction={compareAutoCompleteValues}
                      onInputValueChangeFunction={domainChanged}
                      previouslySelectedItem={formValues?.job ?? null}
                      name="jobField"
                      placeholder="ex: plomberie"
                    />
                  </div>
                  <ErrorMessage name="job" className="errorField" component="div" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label htmlFor="placeField">A proximité de ...</label>
                  <div className="fieldContainer">
                    <AutoCompleteField
                      items={[]}
                      itemToStringFunction={autoCompleteToStringFunction}
                      onSelectedItemChangeFunction={updateValuesFromPlaceAutoComplete}
                      compareItemFunction={compareAutoCompleteValues}
                      onInputValueChangeFunction={fetchAddresses}
                      previouslySelectedItem={formValues?.location ?? null}
                      scrollParentId="rightColumn"
                      name="placeField"
                      placeholder="Adresse ou ville ou code postal"
                    />
                    <img className="inFormIcon" src={mapMarker} alt="" />
                  </div>
                  <ErrorMessage name="location" className="errorField" component="div" />
                </div>
              </Col>
            </Row>

            <Button className="submitButton" type="submit" disabled={isSubmitting}>
              Voir les résultats
            </Button>
          </Form>
        )}
      </Formik>
    );
  };

  return <>{domainError ? <DomainError></DomainError> : renderFormik()}</>;
};

export default StartForm;
