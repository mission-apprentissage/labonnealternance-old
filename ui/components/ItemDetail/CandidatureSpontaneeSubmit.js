import React from "react";


const CandidatureSpontaneeSubmit = (props) => {
  const loadingState = props.loadingState;
  let res = <></>
  if (loadingState === 'not_sent') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit c-candidature-submit--default" type="submit">
            Je postule
          </button>
  } else if (loadingState === 'ok_sent') {
    res = <span className="c-candidature-submit-ok">
            ✓
          </span>
  } else if (loadingState === 'currently_sending') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit c-candidature-submit--spinner" type="submit">
            Veuillez patienter...
          </button>
  } else if (loadingState === 'sent_but_errors') {
    res = <span className="c-candidature-submit-error">
            Erreur lors de l'envoi, veuillez réessayer plus tard
          </span>
  }
  return res
};

export default CandidatureSpontaneeSubmit;
