import React from "react";

const CandidatureSpontaneeMessage = ({ formik }) => {

  return (
    <>
      <fieldset data-testid="fieldset-message" className="c-candidature-message mt-3">
        <h2 className="c-candidature-message-title mb-0">
          Votre message au responsable du recrutement{" "}
          <span className="c-candidature-message-title-optional">(Facultatif)</span>
        </h2>
        <div className="c-candidature-message-subtitle mb-2">
          Indiquez pourquoi vous souhaitez réaliser votre alternance dans son entreprise
        </div>
        <textarea
          id="message"
          name="message"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.message}
        />
      </fieldset>
    </>
  );
};

export default CandidatureSpontaneeMessage;
