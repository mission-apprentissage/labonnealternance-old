import React from "react";

import gotoIcon from "public/images/icons/goto.svg";

const DidAsk1 = () => {
  return (
    <div className="c-detail-advice-text">
      <p>
        Trouver et convaincre une entreprise de vous embaucher ? On vous donne
        <span className="c-detail-traininglink ml-1">
          <a
            href="https://dinum-beta.didask.com/courses/demonstration/60d21bf5be76560000ae916e"
            target="_blank"
            rel="noopener noreferrer"
            className="gtmDidask1"
          >
            &nbsp;des conseils pour vous aider !&nbsp;
            <img src={gotoIcon} alt="Lien" />
          </a>
        </span>
      </p>
    </div>
  );
};

export default DidAsk1;
