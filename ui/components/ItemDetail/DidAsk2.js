import React from "react";

import gotoIcon from "public/images/icons/goto.svg";

const DidAsk2 = () => {
  return <div className="c-detail-advice-text">
    <p>
      Un employeur vous a proposé un entretien ? Préparez le en vous aidant des cas pratiques proposés
      <span className="c-detail-traininglink ml-1">
        <a href="https://dinum-beta.didask.com/courses/demonstration/60d21bf5be76560000ae916e" target="_blank" rel="noopener noreferrer" className="gtmDidask2">
          <img src={gotoIcon} alt="Lien" />
          &nbsp;ici&nbsp;
        </a>
      </span>
      <span className="ml-1"> !</span>
      
    </p>
  </div>
}

export default DidAsk2;
