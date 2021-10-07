import React from "react";
import CandidatureSpontaneeSubmit from "./CandidatureSpontaneeSubmit";
import { ModalBody, ModalFooter } from "reactstrap";

const CandidatureSpontaneeWorked = ({ formik, loadingState}) => {

  return (
      <>
          <ModalBody>
            <h1 className="c-candidature-title">Candidature spontanée</h1>

            <h2>
              Votre candidature a bien été envoyée à l’entreprise.
            </h2>
            <div>
              Un e-mail de confirmation vous a été envoyé sur votre boite e-mail julien.cudot@gmail.comSi vous n'avez pas reçu d'email de confirmation d'ici 24 heures, soumettez à nouveau votre candidature
            </div>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
    </>
  );
};

export default CandidatureSpontaneeWorked;
