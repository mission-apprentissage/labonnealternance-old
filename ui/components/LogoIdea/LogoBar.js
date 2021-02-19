import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import buildDiplomas from "services/buildDiplomas";
import buildRayons from "services/buildRayons";
import { Input } from "reactstrap";
import { partialRight } from "lodash";

import domainChanged from "services/domainChanged";
import updateValuesFromJobAutoComplete from "services/updateValuesFromJobAutoComplete";
import formikUpdateValue from "services/formikUpdateValue";
import { fetchAddresses } from "services/baseAdresse";
import { autoCompleteToStringFunction, compareAutoCompleteValues } from "services/autoCompleteUtilities";

const renderFormik = () => {

  const { isFormVisible, hasSearch, formValues, widgetParameters } = useSelector((state) => state.trainings);

  const [locationRadius, setLocationRadius] = useState(formValues?.radius ?? 30);
  const [diplomas, setDiplomas] = useState([]);
  const [diploma, setDiploma] = useState(formValues?.diploma ?? "");
  const [domainError, setDomainError] = useState(false);
  const [diplomaError, setDiplomaError] = useState(false);

  return (
    <Formik
      initialValues={formValues ?? { job: {}, location: {}, radius: 30, diploma: "" }}
    >
      {({}) => (
        <Form className="c-logobar-form c-searchform">
          <div className="formGroup formGroup--logobar">
            <AutoCompleteField
              kind="Métier"
              items={[]}
              itemToStringFunction={autoCompleteToStringFunction}
              onSelectedItemChangeFunction={partialRight(updateValuesFromJobAutoComplete, setDiplomaError, setDiplomas)}
              compareItemFunction={compareAutoCompleteValues}
              onInputValueChangeFunction={partialRight(domainChanged, setDomainError)}
              previouslySelectedItem={formValues?.job ?? null}
              name="jobField"
              placeholder="ex: plomberie"
              />
            <ErrorMessage name="job" className="errorField" component="div" />
          </div>
          <div className="ml-3">
            <div className="formGroup formGroup--logobar">
                <AutoCompleteField
                  kind="Lieu"
                  items={[]}
                  itemToStringFunction={autoCompleteToStringFunction}
                  onSelectedItemChangeFunction={partialRight(formikUpdateValue, 'location')}
                  compareItemFunction={compareAutoCompleteValues}
                  onInputValueChangeFunction={fetchAddresses}
                  previouslySelectedItem={formValues?.location ?? null}
                  name="placeField"
                  placeholder="ex: marseille"
                />
            </div>
          </div>
          <div className="ml-3">
            <div className="c-logobar-formgroup c-logobar-formgroup--rayon">
              <label htmlFor="jobField" className="c-logobar-label c-logobar-label--rayon">Rayon</label>
              <div className="c-logobar-field">
              <Input
                onChange={() => { }}
                type="select"
                name="rayon"
              >
                {buildRayons()}
              </Input>
            </div>
            </div>
          </div>
          <div className="c-logobar-formgroup c-logobar-formgroup--diploma ml-3">
            <label htmlFor="jobField" className="c-logobar-label c-logobar-label--diploma">Niveau d'études</label>
            <div className="c-logobar-field">
              <Input
                onChange={() => { }}
                type="select"
                name="diploma"
              >
                {buildDiplomas()}
              </Input>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const LogoBar = ({ showSearchForm, showResultList }) => {
  return <div className="c-logobar">
    {renderFormik()}
  </div>
};

export default LogoBar;
