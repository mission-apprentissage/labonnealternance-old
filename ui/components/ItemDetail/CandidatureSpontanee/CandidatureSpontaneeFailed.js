import React from "react";
import { ModalBody, ModalFooter } from "reactstrap";
import error2 from "public/images/icons/input_value_error.svg"

const CandidatureSpontaneeFailed = ({ }) => {

  return (
      <>
          <ModalBody>
            <h1 className="c-candidature-title">Candidature spontanée</h1>

            <div className="c-candidature-worked-header d-flex my-5">
              <div>
            <img src={error2} alt="erreur" />
              </div>
              <div className="ml-3 pl-3">
                <h2 className="c-candidature-worked-title">
                  Une erreur est survenue. 
                </h2>
              </div>
            </div>
            <div className="c-candidature-worked-text mt-3 mb-5">
              Vous pourrez essayer ultérieurement.
            </div>
          </ModalBody>
          <ModalFooter className="pb-5"></ModalFooter>
    </>
  );
};

export default CandidatureSpontaneeFailed;
