import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col, Input } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField, LogoIdea, RadioButton } from "../../";
import { fetchAddresses } from "../../../services/baseAdresse";
import fetchRomes from "../../../services/fetchRomes";
import fetchDiplomas from "../../../services/fetchDiplomas";
import { DomainError } from "../../";
import buildRayons from "services/buildRayons";

const SearchForm = (props) => {
  const { isFormVisible, hasSearch, formValues, widgetParameters } = useSelector((state) => state.trainings);

  const [locationRadius, setLocationRadius] = useState(formValues?.radius ?? 30);
  const [diplomas, setDiplomas] = useState([]);
  const [diploma, setDiploma] = useState(formValues?.diploma ?? "");
  const [domainError, setDomainError] = useState(false);
  const [diplomaError, setDiplomaError] = useState(false);

  const diplomaMap = {
    "3 (CAP...)": "Cap, autres formations niveau 3",
    "4 (Bac...)": "Bac, autres formations niveau 4",
    "5 (BTS, DUT...)": "BTS, DUT, autres formations niveaux 5 (Bac+2)",
    "6 (Licence...)": "Licence, autres formations niveaux 6 (bac+3)",
    "7 (Master, titre ingénieur...)": "Master, titre ingénieur, autres formations niveaux 7 ou 8 (bac+5)",
  };

  const domainChanged = async function (val) {
    const res = await fetchRomes(val, () => {
      setDomainError(true);
    });
    return res;
  };

  const buildAvailableDiplomas = () => {
    return (
      <>
        <option value="">Indifférent</option>
        {diplomas.length
          ? diplomas.sort().map((diploma) => {
              return (
                <option key={diploma} value={diploma}>
                  {diplomaMap[diploma]}
                </option>
              );
            })
          : Object.keys(diplomaMap).map((key) => {
              return (
                <option key={key} value={key}>
                  {diplomaMap[key]}
                </option>
              );
            })}
      </>
    );
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

    updateDiplomaSelectionFromJobChange(item);
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromPlaceAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("location", item);
    }, 0);
  };

  const handleRadiusChange = (radius, setFieldValue) => {
    setLocationRadius(radius);

    setTimeout(() => {
      setFieldValue("radius", radius);
    }, 0);
  };

  const handleDiplomaChange = (evt, setFieldValue) => {
    const value = evt.currentTarget.value;
    setDiploma(value);
    setTimeout(() => {
      setFieldValue("diploma", value);
    }, 0);
  };

  const getRadioButton = (inputName, value, label, selectedValue, setFieldValue, handleChange) => {
    return (
      <Col xs="3" className="radioButton">
        <RadioButton
          handleChange={handleChange}
          inputName={inputName}
          value={value}
          label={label}
          selectedValue={selectedValue}
          setFieldValue={setFieldValue}
        />
      </Col>
    );
  };

  const updateDiplomaSelectionFromJobChange = async (job) => {
    let diplomas = [];
    if (job) {
      diplomas = await fetchDiplomas(job.romes, () => {
        setDiplomaError(true);
      });
    }

    setTimeout(() => {
      setDiplomas(diplomas);
    }, 0);
  };

  const renderFormik = () => {
    return (
      <Formik
        validate={(values) => {
          const errors = {};

          if (
            !(
              widgetParameters?.parameters?.jobName &&
              widgetParameters?.parameters?.romes &&
              widgetParameters?.parameters?.frozenJob
            ) &&
            (!values.job || !values.job.label || !values.job.romes || !values.job.romes.length > 0)
          ) {
            errors.job = "Sélectionnez un domaine proposé";
          }

          if (!values.location || !values.location.label) {
            errors.location = "Sélectionnez un lieu proposé";
          }
          return errors;
        }}
        initialValues={formValues ?? { job: {}, location: {}, radius: 30, diploma: "" }}
        onSubmit={props.handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="c-searchform">
            <Row>
              {widgetParameters?.parameters?.jobName &&
              widgetParameters?.parameters?.romes &&
              widgetParameters?.parameters?.frozenJob ? (
                <Col xs="12">
                  <div className="formGroup">
                    <label>{`Vous souhaitez travailler dans le domaine de ${widgetParameters.parameters.jobName}`}</label>
                  </div>
                </Col>
              ) : (
                <>
                  <Col xs="12">
                    <div className="formGroup">
                      <h1 className="h6 font-weight-bold">Votre recherche</h1>
                      <div className="">
                        <AutoCompleteField
                          kind="Métier"
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


                </>
              )}

              <Col xs="12">
                <div className="formGroup mt-3">
                  <AutoCompleteField
                    kind="Lieu"
                    items={[]}
                    itemToStringFunction={autoCompleteToStringFunction}
                    onSelectedItemChangeFunction={updateValuesFromPlaceAutoComplete}
                    compareItemFunction={compareAutoCompleteValues}
                    onInputValueChangeFunction={fetchAddresses}
                    previouslySelectedItem={formValues?.location ?? null}
                    scrollParentId="choiceColumn"
                    name="placeField"
                    placeholder="Adresse ou ville ou code postal"
                  />
                  <ErrorMessage name="location" className="errorField" component="div" />
                </div>
              </Col>


              <Col xs="12">
                <div className="formGroup c-logobar-formgroup mt-3">
                  <div className="">
                    <label htmlFor="jobField" className="c-logobar-label">Diplôme</label>
                    <div className="c-logobar-field ml-2">
                      <Input
                        onChange={(evt) => handleDiplomaChange(evt, setFieldValue)}
                        value={diploma}
                        type="select"
                        name="diploma"
                      >
                        {buildAvailableDiplomas()}
                      </Input>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs="12">
                <div className="c-logobar-formgroup formGroup mt-3">
                  <label htmlFor="jobField" className="c-logobar-label">Rayon</label>
                  <div className="c-logobar-field ml-2">
                    <Input
                      onChange={() => { }}
                      type="select"
                      name="rayon"
                    >
                      {buildRayons()}
                    </Input>
                  </div>
                </div>
              </Col>
            
            </Row>
            <div className='formGroup'>
              <button
                type="submit"
                className="d-block btn btn-lg btn-dark w-100 font-weight-bold c-regular-darkbtn mt-5"
                disabled={isSubmitting}
              >
                C'est parti
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div className={isFormVisible ? "" : "hiddenSearchForm"}>
      <div className="formGroup">
        <LogoIdea />
        {hasSearch ? (
          <button className="c-detail-back px-3 py-1" onClick={props.showResultList}>
            ← Retour
          </button>
        ) : (
          ""
        )}
      </div>

      {domainError || diplomaError ? <DomainError></DomainError> : renderFormik()}
    </div>
  );
};

export default SearchForm;
