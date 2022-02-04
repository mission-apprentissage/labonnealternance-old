import React from "react";

import gotoIcon from "public/images/icons/goto.svg";

const DidAsk2 = () => {
  return (
    <div className="c-detail-advice-text">
      <p>
        Un employeur vous a proposé un entretien ?
        <span className="c-detail-traininglink ml-1">
          <a
            href="https://dinum-beta.didask.com/courses/demonstration/60d1adbb877dae00003f0eac"
            target="_blank"
            rel="noopener noreferrer"
            className="gtmDidask2"
          >
            <img src={gotoIcon} alt="Lien" />
            &nbsp;Préparez&nbsp;le&nbsp;en&nbsp;vous&nbsp;aidant&nbsp;de&nbsp;ces&nbsp;cas&nbsp;pratiques&nbsp;!
          </a>
        </span>
        <span className="ml-1"> !</span>
      </p>
    </div>
  );
};

export default DidAsk2;
