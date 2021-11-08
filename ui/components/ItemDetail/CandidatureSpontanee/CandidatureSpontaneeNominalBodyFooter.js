import React from "react";
import CandidatureSpontaneeSubmit from "./CandidatureSpontaneeSubmit";
import { ModalBody, ModalFooter } from "reactstrap";
import CandidatureSpontaneeFileDropzone from "./CandidatureSpontaneeFileDropzone";
import CandidatureSpontaneeMessage from "./CandidatureSpontaneeMessage";
import { testingParameters } from "../../../utils/testingParameters";

const CandidatureSpontaneeNominalBodyFooter = ({ formik, sendingState, company, item, kind }) => {
  const setFileValue = (fileValue) => {
    formik.values.fileName = fileValue?.fileName || null;
    formik.values.fileContent = fileValue?.fileContent || null;
  };

  return (
    <>
      <ModalBody data-testid="modalbody-nominal">
        <h1 className="c-candidature-title" data-testid="CandidatureSpontaneeTitle">
          {
            kind === 'matcha' ?
              <>Postuler à l'offre de {company}</>
              :
              <>Candidature spontanée</>
          }
        </h1>

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
              data-testid="lastName"
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
              data-testid="firstName"
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
              data-testid="email"
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
              data-testid="phone"
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

        <CandidatureSpontaneeMessage formik={formik} kind={kind}/>

        <div className="c-candidature-message mt-3">
          <CandidatureSpontaneeFileDropzone formik={formik} setFileValue={setFileValue} />
        </div>

        <fieldset
          data-testid="fieldset-terms"
          className="c-candidature-terms mt-3"
        >
          <label htmlFor="terms" className="c-candidature-terms-text">
            <div>
              En remplissant ce formulaire, vous acceptez les{" "}
              <a href="/cgu" className="c-candidature-link" target="_blank">
                Conditions générales d'utilisation
              </a>{" "}
              du service La Bonne Alternance et acceptez le partage de vos informations avec l'entreprise {company}
            </div>
          </label>
        </fieldset>
      </ModalBody>
      <ModalFooter>
        <CandidatureSpontaneeSubmit item={item} sendingState={sendingState} />
      </ModalFooter>
    </>
  );
};

export default CandidatureSpontaneeNominalBodyFooter;
