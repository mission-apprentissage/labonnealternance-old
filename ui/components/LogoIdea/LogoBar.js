import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AutoCompleteField } from "../";


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
