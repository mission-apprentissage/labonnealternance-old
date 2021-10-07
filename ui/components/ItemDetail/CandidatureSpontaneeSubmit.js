import React from "react";
import { Spinner } from "reactstrap";


const CandidatureSpontaneeSubmit = (props) => {
  const sendingState = props.sendingState;
  let res = <></>
  if (sendingState === 'not_sent') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit c-candidature-submit--default" type="submit">
            Je postule
          </button>
  } else if (sendingState === 'ok_sent') {
    console.log('ok success')
    res = <span className="c-candidature-submit-ok">
            Succès
          </span>
  } else if (sendingState === 'currently_sending') {
    res = <span className="c-candidature-submit-sending">
            <Spinner color="primary" />{' '}Veuillez patienter
          </span>
  } else if (sendingState === 'sent_but_errors') {
      console.log('nope, error')
    res = <span className="c-candidature-submit-error">
            Erreur lors de l'envoi, veuillez réessayer plus tard
          </span>
  }
  return res
};

export default CandidatureSpontaneeSubmit;
