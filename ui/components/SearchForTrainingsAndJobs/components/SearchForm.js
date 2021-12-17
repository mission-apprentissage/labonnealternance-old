import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Input } from "reactstrap";
import { Formik, Form, ErrorMessage } from "formik";
import { AutoCompleteField } from "../../../components/AutoCompleteField/AutoCompleteField";

import { fetchAddresses } from "../../../services/baseAdresse";
import { DomainError } from "../../";
import buildRayons from "services/buildRayons";
import handleSelectChange from "services/handleSelectChange";
import { partialRight } from "lodash";
import domainChanged from "services/domainChanged";
import { autoCompleteToStringFunction, compareAutoCompleteValues } from "services/autoCompleteUtilities";
import updateValuesFromJobAutoComplete from "services/updateValuesFromJobAutoComplete";
import formikUpdateValue from "services/formikUpdateValue";
import buildAvailableDiplomas from "services/buildAvailableDiplomas";
import validateFormik from "services/validateFormik";

const SearchForm = (props) => {
  const { isFormVisible, hasSearch, formValues, widgetParameters } = useSelector((state) => state.trainings);

  useEffect(() => {
    setLocationRadius(contextFormValues?.radius ?? 30);
    setDiploma(contextFormValues?.diploma ?? "");
    setJobValue(contextFormValues?.job ?? null);
  }, [widgetParameters?.applyFormValues]);

  const contextFormValues =
    widgetParameters?.applyFormValues && widgetParameters?.formValues ? widgetParameters.formValues : formValues;

  const [jobValue, setJobValue] = useState(null);
  const [locationRadius, setLocationRadius] = useState(30);
  const [diplomas, setDiplomas] = useState([]);
  const [diploma, setDiploma] = useState("");
  const [domainError, setDomainError] = useState(false);
  const [diplomaError, setDiplomaError] = useState(false);

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

  const renderFormik = () => {
    return (
      <Formik
        validate={(values) => validateFormik(values, widgetParameters)}
        initialValues={{ job: {}, location: {}, radius: 30, diploma: "" }}
        onSubmit={props.handleSearchSubmit}
      >
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form className={`c-searchform c-searchform--column is-home-${props.isHome}`}>
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
                    <h1 className="card-title">
                      <span className="c-home-hero__title c-home-hero__title1 d-block d-md-inline">
                        Se former et travailler{" "}
                      </span>
                      <span className="c-home-hero__title c-home-hero__title2 d-block d-md-inline">en alternance</span>
                    </h1>
                    <div className="formGroup">
                      <h1 className="h6 font-weight-bold">Votre recherche</h1>
                      <div className={`${errors.job ? "c-searchform--onerror" : ""}`}>
                        <AutoCompleteField
                          kind="Métier ou diplôme *"
                          items={[]}
                          initialSelectedItem={contextFormValues?.job || null}
                          itemToStringFunction={autoCompleteToStringFunction}
                          onSelectedItemChangeFunction={partialRight(updateValuesFromJobAutoComplete, setDiplomas)}
                          compareItemFunction={compareAutoCompleteValues}
                          onInputValueChangeFunction={jobChanged}
                          name="jobField"
                          placeholder="Ex : boulangerie"
                          searchPlaceholder="Indiquez un métier ou diplôme ci-dessus"
                          splitItemsByTypes={[
                            { type: "job", typeLabel: "Métiers", size: 4 },
                            { type: "diploma", typeLabel: "Diplômes", size: 4 },
                            { typeLabel: "...autres métiers et diplômes" },
                          ]}
                        />
                        <ErrorMessage name="job" className="errorField" component="div" />
                      </div>
                    </div>
                  </Col>
                </>
              )}

              <Col xs="12">
                <div className={`formGroup mt-3 ${errors.location ? "c-searchform--onerror" : ""}`}>
                  <AutoCompleteField
                    kind="Lieu *"
                    items={[]}
                    initialSelectedItem={contextFormValues?.location ?? null}
                    itemToStringFunction={autoCompleteToStringFunction}
                    onSelectedItemChangeFunction={partialRight(formikUpdateValue, "location")}
                    compareItemFunction={compareAutoCompleteValues}
                    onInputValueChangeFunction={addressChanged}
                    name="placeField"
                    placeholder="Adresse, ville ou code postal"
                    searchPlaceholder="Indiquez le lieu recherché ci-dessus"
                  />
                  <ErrorMessage name="location" className="errorField" component="div" />
                </div>
              </Col>
              <Col xs="12">
                <div className="c-logobar-formgroup formGroup mt-3">
                  <label htmlFor="jobField" className="c-logobar-label">
                    Rayon
                  </label>
                  <div className="c-logobar-field">
                    <Input
                      onChange={(evt) => handleSelectChange(evt, setFieldValue, setLocationRadius, "radius")}
                      type="select"
                      value={locationRadius}
                      name="locationRadius"
                    >
                      {buildRayons()}
                    </Input>
                  </div>
                </div>
              </Col>
              <Col xs="12">
                <div className="formGroup c-logobar-formgroup mt-3">
                  <div className="">
                    <label htmlFor="jobField" className="c-logobar-label">
                      Niveau d'études
                    </label>
                    <div className="c-logobar-field">
                      <Input
                        onChange={(evt) => handleSelectChange(evt, setFieldValue, setDiploma, "diploma")}
                        value={diploma}
                        type="select"
                        name="diploma"
                      >
                        {buildAvailableDiplomas(diplomas)}
                      </Input>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="formGroup submitGroup">
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
        {hasSearch && !props.isHome ? (
          <button className="c-detail-back px-3 py-1" onClick={props.showResultList}>
            ← Retour
          </button>
        ) : (
          ""
        )}
      </div>

      {domainError || diplomaError ? (
        <DomainError setDomainError={setDomainError} setDiplomaError={setDiplomaError} />
      ) : (
        renderFormik()
      )}
    </div>
  );
};

export default SearchForm;
