import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import glassImage from "public/images/glass_white.svg";
import { Formik, Form, Field } from "formik";
import { AutoCompleteField } from "..";
import buildAvailableDiplomas from "../../services/buildAvailableDiplomas";
import buildRayons from "../../services/buildRayons";
import { Input } from "reactstrap";
import { partialRight } from "lodash";
import { DomainError } from "../../components";

import domainChanged from "../../services/domainChanged";
import updateValuesFromJobAutoComplete from "../../services/updateValuesFromJobAutoComplete";
import formikUpdateValue from "../../services/formikUpdateValue";
import handleSelectChange from "../../services/handleSelectChange";
import { fetchAddresses } from "../../services/baseAdresse";
import { autoCompleteToStringFunction, compareAutoCompleteValues } from "../../services/autoCompleteUtilities";
import validateFormik from "../../services/validateFormik";

const HeaderForm = ({ handleSearchSubmit, isHome }) => {
  const { formValues, widgetParameters } = useSelector((state) => {
    return state.trainings;
  });

  useEffect(() => {
    setLocationRadius(contextFormValues?.radius ?? 30);
    setDiploma(contextFormValues?.diploma ?? "");
  }, [widgetParameters?.applyFormValues]);

  const contextFormValues =
    widgetParameters?.applyFormValues && widgetParameters?.formValues ? widgetParameters.formValues : formValues;

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
        onSubmit={handleSearchSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="c-logobar-form c-searchform">
            <div className={`formGroup formGroup--logobar ${errors.job ? "formGroup--logobar-onerror" : ""}`}>
              <AutoCompleteField
                kind="Métier ou diplôme *"
                items={[]}
                initialSelectedItem={contextFormValues?.job || null}
                itemToStringFunction={autoCompleteToStringFunction}
                onSelectedItemChangeFunction={partialRight(updateValuesFromJobAutoComplete, setDiplomas)}
                compareItemFunction={compareAutoCompleteValues}
                onInputValueChangeFunction={jobChanged}
                isDisabled={
                  widgetParameters?.parameters?.jobName &&
                  widgetParameters?.parameters?.romes &&
                  widgetParameters?.parameters?.frozenJob
                }
                name="jobField"
                placeholder="Indiquez un métier ou diplôme"
                searchPlaceholder="Indiquez un métier ou diplôme ci-dessus"
                splitItemsByTypes={[
                  { type: "job", typeLabel: "Métiers", size: 4 },
                  { type: "diploma", typeLabel: "Diplômes", size: 4 },
                  { typeLabel: "...autres métiers et diplômes" },
                ]}
              />
            </div>
            <div className="ml-3">
              <div className={`formGroup formGroup--logobar ${errors.location ? "formGroup--logobar-onerror" : ""}`}>
                <AutoCompleteField
                  kind="Lieu"
                  items={[]}
                  initialSelectedItem={contextFormValues?.location ?? null}
                  itemToStringFunction={autoCompleteToStringFunction}
                  onSelectedItemChangeFunction={partialRight(formikUpdateValue, "location")}
                  compareItemFunction={compareAutoCompleteValues}
                  onInputValueChangeFunction={addressChanged}
                  name="placeField"
                  placeholder={isHome ? "A quel endroit ?" : "Adresse, ville ou code postal"}
                  searchPlaceholder="Indiquez le lieu recherché ci-dessus"
                />
              </div>
            </div>
            <div className="ml-3">
              <div className="c-logobar-formgroup c-logobar-formgroup--rayon">
                <label htmlFor="jobField" className="c-logobar-label c-logobar-label--rayon">
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
            </div>
            <div className="c-logobar-formgroup c-logobar-formgroup--diploma ml-3">
              <label htmlFor="jobField" className="c-logobar-label c-logobar-label--diploma">
                Niveau d'études visé
              </label>
              <div className="c-logobar-field">
                <Input
                  onChange={(evt) => handleSelectChange(evt, setFieldValue, setDiploma, "diploma")}
                  type="select"
                  value={diploma}
                  name="diploma"
                >
                  {buildAvailableDiplomas(diplomas)}
                </Input>
              </div>
            </div>
            <div className="c-logobar-formgroup ml-md-1 ml-lg-3 border-0 c-logobar-submit-container">
              <button
                type="submit"
                className={`d-block btn btn-lg btn-dark w-100 font-weight-bold c-regular-darkbtn c-logobar-submit is-home-${isHome}`}
                disabled={isSubmitting}
                alt="Lancer la recherche"
              >
                <img alt="" src={glassImage} />
                {isHome ? <div className="c-logobar-letstart">C'est parti</div> : ""}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div className="c-logobar">
      {domainError || diplomaError ? (
        <DomainError position="header" setDomainError={setDomainError} setDiplomaError={setDiplomaError} />
      ) : (
        renderFormik()
      )}
    </div>
  );
};

export default HeaderForm;
