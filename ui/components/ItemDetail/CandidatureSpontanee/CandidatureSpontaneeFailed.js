import React from "react";
import { ModalBody, ModalFooter } from "reactstrap";
import error2 from "public/images/icons/input_value_error.svg";

const CandidatureSpontaneeFailed = ({ sendingState }) => {
  const errorReasonText = () =>
    sendingState === "email temporaire non autorisé" ? (
      <>
        <div className="c-candidature-worked-header d-flex my-5">
          <div>
            <img src={error2} alt="erreur" />
          </div>
          <div className="ml-3 pl-3">
            <h2 className="c-candidature-worked-title" data-testid="CandidatureSpontaneeFailedTempEmailTitle">
              Les adresses emails temporaires ne sont pas acceptées
            </h2>
          </div>
        </div>
        <div className="c-candidature-worked-text mt-3 mb-5">
          Les adresses emails temporaires ne sont pas acceptées pour envoyer des candidatures via La Bonne Alternance.
          <br />
          Merci d'utiliser une adresse email permanente
        </div>
      </>
    ) : (
      <>
        <div className="c-candidature-worked-header d-flex my-5">
          <div>
            <img src={error2} alt="erreur" />
          </div>
          <div className="ml-3 pl-3">
            <h2 className="c-candidature-worked-title" data-testid="CandidatureSpontaneeFailedTitle">
              Une erreur est survenue.
            </h2>
          </div>
        </div>
        <div className="c-candidature-worked-text mt-3 mb-5">Vous pourrez essayer ultérieurement.</div>
      </>
    );

  return (
    <div data-testid="CandidatureSpontaneeFailed">
      <ModalBody>
        <h1 className="c-candidature-title">Candidature spontanée</h1>
        {errorReasonText()}
      </ModalBody>
      <ModalFooter className="pb-5"></ModalFooter>
    </div>
  );
};

export default CandidatureSpontaneeFailed;
