import React, { useState } from "react";
import { Button, Container, Row, Col, Input } from "reactstrap";
import "../searchfortrainingsandjobs.css";
import mapMarker from "../../../assets/icons/pin.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField, LogoIdea, RadioButton } from "../../";
import { fetchAddresses } from "../../../services/baseAdresse";
import fetchRomes from "../../../services/fetchRomes";
import fetchDiplomas from "../../../services/fetchDiplomas";
import DomainError from "./DomainError/DomainError";

const SearchForm = (props) => {
  const [locationRadius, setLocationRadius] = useState(30);
  const [diplomas, setDiplomas] = useState([]);
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
          if (!values.job || !values.job.label || !values.job.romes || !values.job.romes.length > 0) {
            errors.job = "Sélectionnez un domaine proposé";
          }
          if (!values.location || !values.location.label) {
            errors.location = "Sélectionnez un lieu proposé";
          }
          return errors;
        }}
        initialValues={{ job: {}, location: {}, radius: 30, diploma: "" }}
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
                      name="jobField"
                      placeholder="ex: plomberie"
                    />
                  </div>
                  <ErrorMessage name="job" className="errorField" component="div" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label htmlFor="diplomaField">Le diplôme que vous souhaitez obtenir ...</label>
                  <div className="fieldContainer">
                    <Input onChange={(evt) => handleDiplomaChange(evt, setFieldValue)} type="select" name="diploma">
                      {buildAvailableDiplomas()}
                    </Input>
                  </div>
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
                      scrollParentId="rightColumn"
                      name="placeField"
                      placeholder="Adresse ou ville ou code postal"
                    />
                    <img className="inFormIcon" src={mapMarker} alt="" />
                  </div>
                  <ErrorMessage name="location" className="errorField" component="div" />
                </div>
              </Col>

              <Col xs="12">
                <div className="formGroup">
                  <label>Dans un rayon de ...</label>
                  <Field type="hidden" value={locationRadius} name="locationRadius" />
                  <div className="buttons">
                    <Container>
                      <Row>
                        {getRadioButton(
                          "locationRadius",
                          10,
                          "10km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          30,
                          "30km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          60,
                          "60km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                        {getRadioButton(
                          "locationRadius",
                          100,
                          "100km",
                          locationRadius,
                          setFieldValue,
                          handleRadiusChange
                        )}
                      </Row>

                      <ErrorMessage name="locationRadius" className="errorField" component="div" />
                    </Container>
                  </div>
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

  return (
    <div className={props.isFormVisible ? "" : "hiddenSearchForm"}>
      <header>
        <LogoIdea />
        {props.hasSearch ? (
          <Button className="blueButton" onClick={props.showResultList}>
            Retour
          </Button>
        ) : (
          ""
        )}
      </header>
      <div className="clearBoth" />

      {domainError || diplomaError ? <DomainError></DomainError> : renderFormik()}
    </div>
  );
};

export default SearchForm;
