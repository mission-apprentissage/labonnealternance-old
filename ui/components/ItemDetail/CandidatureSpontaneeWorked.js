import React from "react";
import { ModalBody, ModalFooter } from "reactstrap";
import paperplaneIcon from "public/images/paperplane2.svg";


const CandidatureSpontaneeWorked = ({ formik, loadingState}) => {

  return (
      <>
          <ModalBody>
            <h1 className="c-candidature-title">Candidature spontanée</h1>

            <div className="c-candidature-worked-header d-flex my-5">
              <div>
                <img src={paperplaneIcon} alt="avion en papier" />
              </div>
              <div className="ml-3">
                <h2 className="c-candidature-worked-title">
                  Votre candidature a bien été envoyée à l’entreprise.
                </h2>
              </div>
            </div>
            <div className="c-candidature-worked-text">
              Un e-mail de confirmation vous a été envoyé sur votre boite e-mail.
            </div>
            <div className="c-candidature-worked-text mt-3 mb-5">
              Si vous n'avez pas reçu d'email de confirmation d'ici 24 heures, soumettez à nouveau votre candidature
            </div>
          </ModalBody>
          <ModalFooter className="pb-5">
            
          </ModalFooter>
    </>
  );
};

export default CandidatureSpontaneeWorked;
