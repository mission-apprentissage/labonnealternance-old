import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";
import  buildDiplomas from "services/buildDiplomas";
import  buildRayons from "services/buildRayons";
import { Input } from "reactstrap";


const renderFormik = () => {
  return (
    <Formik>
      {({ }) => (
        <Form className="c-logobar-form">
          <div className="c-logobar-formgroup">
            <label htmlFor="jobField" className="c-logobar-label">Métier</label>
            <div className="c-logobar-field">
              <AutoCompleteField
                items={[]}
                itemToStringFunction={() => {}}
                onSelectedItemChangeFunction={() => {}}
                compareItemFunction={() => {}}
                onInputValueChangeFunction={() => {}}
                name="jobField"
                placeholder="ex: plomberie"
              />
            </div>
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
