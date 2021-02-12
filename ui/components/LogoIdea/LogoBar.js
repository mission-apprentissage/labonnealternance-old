import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";


const renderFormik = () => {
  return (
    <Formik>
      {({ }) => (
        <Form className="c-logobar-form">
          <div className="formGroup">
            <label htmlFor="jobField" className="sr-only">Choisissez le domaine de votre projet</label>
            <div className="fieldContainer">
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
