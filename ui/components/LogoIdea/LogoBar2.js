import React, {useState} from "react";
import { useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import  buildDiplomas from "services/buildDiplomas";
import  buildRayons from "services/buildRayons";
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

  return (
    <Formik>
      {({ }) => (
        <Form className="c-logobar-form c-searchform">
            <div className="formGroup">
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
          <div className="c-logobar-formgroup ml-3">
            <label htmlFor="jobField" className="c-logobar-label">Lieu</label>
            <div className="c-logobar-field">
              <AutoCompleteField
                items={[]}
                itemToStringFunction={() => {}}
                onSelectedItemChangeFunction={() => {}}
                compareItemFunction={() => {}}
                onInputValueChangeFunction={() => {}}
                name="jobField"
                placeholder="ex: marseille"
              />
            </div>
          </div>
          <div className="c-logobar-formgroup ml-3">
            <label htmlFor="jobField" className="c-logobar-label">Rayon</label>
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
          <div className="c-logobar-formgroup ml-3">
            <label htmlFor="jobField" className="c-logobar-label">Niveau d'études</label>
            <div className="c-logobar-field">
              <Input
                onChange={() => {}}
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
