import React, { useEffect } from "react";
import CandidatureSpontaneeSubmit from "./CandidatureSpontaneeSubmit";
import { ModalBody, ModalFooter } from "reactstrap";
import CandidatureSpontaneeFileDropzone from "./CandidatureSpontaneeFileDropzone";
import { testingParameters } from "../../../utils/testingParameters";

const CandidatureSpontaneeNominalBodyFooter = ({ formik, sendingState, company }) => {
  const setFileValue = (fileValue) => {
    formik.values.fileName = fileValue?.fileName || null;
    formik.values.fileContent = fileValue?.fileContent || null;
  };

  useEffect(() => {
    formik.values.terms = false;
  }, [company]);

  return (
    <>
      <ModalBody data-testid="modalbody-nominal">
        <h1 className="c-candidature-title">Candidature spontanée</h1>

        <div className="c-candidature-personaldata d-flex flex-column flex-md-row mt-4">
          <fieldset
            data-testid="fieldset-lastname"
            className={`mr-0 mr-md-3 c-candidature-field ${
              formik.touched.lastName ? `is-valid-${!formik.errors.lastName}` : "is-not-validated"
            }`}
          >
            <label htmlFor="lastName">Nom *</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="c-candidature-erreur visible">{formik.errors.lastName}</div>
            ) : (
              <div className="invisible">{"pas d'erreur"}</div>
            )}
          </fieldset>

          <fieldset
            data-testid="fieldset-firstname"
            className={`mt-1 mt-md-0 c-candidature-field ${
              formik.touched.firstName ? `is-valid-${!formik.errors.firstName}` : "is-not-validated"
            }`}
          >
            <label htmlFor="firstName">Prénom *</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="c-candidature-erreur visible">{formik.errors.firstName}</div>
            ) : (
              <div className="invisible">{"pas d'erreur"}</div>
            )}
          </fieldset>
        </div>

        <div className="d-flex flex-column flex-md-row mt-0 mt-md-3">
          <fieldset
            data-testid="fieldset-email"
            className={`mt-1 mt-md-0 mr-0 mr-md-3 c-candidature-field ${
              formik.touched.email ? `is-valid-${!formik.errors.email}` : "is-not-validated"
            }`}
          >
            <label htmlFor="email">E-mail *</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="c-candidature-erreur visible">{formik.errors.email}</div>
            ) : (
              <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>
            )}
            {testingParameters?.simulatedRecipient ? (
              <div>Les emails seront envoyés à {testingParameters.simulatedRecipient}</div>
            ) : (
              ""
            )}
          </fieldset>

          <fieldset
            data-testid="fieldset-phone"
            className={`mt-1 mt-md-0 c-candidature-field ${
              formik.touched.phone ? `is-valid-${!formik.errors.phone}` : "is-not-validated"
            }`}
          >
            <label htmlFor="email">Téléphone *</label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="c-candidature-erreur visible">{formik.errors.phone}</div>
            ) : (
              <div className="invisible">{"pas d'erreur"}</div>
            )}
          </fieldset>
        </div>

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

        <div className="c-candidature-message mt-3">
          <CandidatureSpontaneeFileDropzone formik={formik} setFileValue={setFileValue} />
        </div>

        <fieldset
          data-testid="fieldset-terms"
          className={`c-candidature-terms mt-3 ${
            formik.touched.terms ? `is-valid-${!formik.errors.terms}` : "is-not-validated"
          }`}
        >
          <label htmlFor="terms" className="c-candidature-terms-text">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.terms}
            />
            En remplissant ce formulaire, vous acceptez les Conditions générales d'utilisation du service La Bonne
            Alternance et acceptez le partage de vos informations avec l'entreprise {company}
          </label>
        </fieldset>
        {formik.touched.terms && formik.errors.terms ? (
          <div className="c-candidature-erreur visible">{formik.errors.terms}</div>
        ) : (
          <div className="invisible">{"pas d'erreur"}</div>
        )}
      </ModalBody>
      <ModalFooter>
        <CandidatureSpontaneeSubmit sendingState={sendingState} />
      </ModalFooter>
    </>
  );
};

export default CandidatureSpontaneeNominalBodyFooter;
