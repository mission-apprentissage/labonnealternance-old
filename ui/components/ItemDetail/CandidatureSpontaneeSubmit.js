import React from "react";


const CandidatureSpontaneeSubmit = (props) => {
  const loadingState = props.loadingState;
  let res = <></>
  if (loadingState === 'not_sent') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit" type="submit">Je postule</button>
  } else if (loadingState === 'ok_sent') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit" type="submit">✓</button>
  } else if (loadingState === 'currently_sending') {
    res = <button className="btn btn-dark btn-dark-action c-candidature-submit" type="submit">Veuillez patienter...</button>
  } else if (loadingState === 'sent_but_errors') {
    res = <>Erreur lors de l'envoi, veuillez réessayer plus tard</>
  }
  return res
};

export default CandidatureSpontaneeSubmit;
