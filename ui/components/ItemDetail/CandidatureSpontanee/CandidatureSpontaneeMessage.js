import React from "react";

const CandidatureSpontaneeMessage = ({ formik, kind }) => {

  if (kind !== 'matcha') {
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
  } else {

    return (
      <>
        <fieldset
          data-testid="fieldset-message"
          className={`mt-3 c-candidature-message ${formik.touched.message ? `is-valid-${!formik.errors.message}` : "is-not-validated"}`}
        >
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
        {formik.touched.message && formik.errors.message ? (
          <div className="c-candidature-erreur visible">{formik.errors.message}</div>
        ) : (
          <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>
        )}
      </>
    );
    
  }
};

export default CandidatureSpontaneeMessage;
