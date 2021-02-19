import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import buildDiplomas from "services/buildDiplomas";
import buildRayons from "services/buildRayons";
import { Input } from "reactstrap";

import fetchRomes from "services/fetchRomes";
import fetchDiplomas from "services/fetchDiplomas";


const renderFormik = () => {

  const { isFormVisible, hasSearch, formValues, widgetParameters } = useSelector((state) => state.trainings);

  const [locationRadius, setLocationRadius] = useState(formValues?.radius ?? 30);
  const [diplomas, setDiplomas] = useState([]);
  const [diploma, setDiploma] = useState(formValues?.diploma ?? "");
  const [domainError, setDomainError] = useState(false);
  const [diplomaError, setDiplomaError] = useState(false);

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

    updateDiplomaSelectionFromJobChange(item);
  };

  // Mets à jours les valeurs de champs du formulaire Formik à partir de l'item sélectionné dans l'AutoCompleteField
  const updateValuesFromPlaceAutoComplete = (item, setFieldValue) => {
    //setTimeout perme d'éviter un conflit de setState
    setTimeout(() => {
      setFieldValue("location", item);
    }, 0);
  };

  return (
    <Formik>
      {({ }) => (
        <Form className="c-logobar-form c-searchform">
          <div className="formGroup formGroup--logobar">
            <AutoCompleteField
              kind="Métier"
              items={[]}
              itemToStringFunction={autoCompleteToStringFunction}
              onSelectedItemChangeFunction={updateValuesFromJobAutoComplete}
              compareItemFunction={compareAutoCompleteValues}
              onInputValueChangeFunction={domainChanged}
              previouslySelectedItem={null}
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
                  itemToStringFunction={() => { }}
                  onSelectedItemChangeFunction={() => { }}
                  compareItemFunction={() => { }}
                  onInputValueChangeFunction={() => { }}
                  name="jobField  "
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
