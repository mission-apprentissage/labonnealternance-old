import React from "react";

import gotoIcon from "public/images/icons/goto.svg";

const DidAsk1 = () => {
  return <div className="c-detail-advice-text">
    <p>
      Trouver et convaincre une entreprise de vous embaucher ? On vous donne des conseils
      <span className="c-detail-traininglink ml-1">
        <a href="https://dinum-beta.didask.com/courses/demonstration/60d21bf5be76560000ae916e" target="_blank" rel="noopener noreferrer" className="gtmDidask1">
          <img src={gotoIcon} alt="Lien" />
          &nbsp;ici&nbsp;
        </a>
      </span>
      <span className="ml-1">pour vous aider !</span>
      
    </p>
  </div>
}

export default DidAsk1;
