import React from "react";

import thumbup from "public/images/thumbup.svg";
import thumbdown from "public/images/thumbdown.svg";

const GoingToContactQuestion = ({  }) => {
  return (
    <div className="">
      <button type="button" className="c-goingto-thumb">
        <img src={thumbup} alt="oui : pouce vers le haut" />
        <span className="ml-1">Oui</span>
      </button>
      <button type="button" className="c-goingto-thumb ml-2">
        <img src={thumbdown} alt="non : pouce vers le bas" />
        <span className="ml-1">Non</span>
      </button>
    </div>
  );
};

export default GoingToContactQuestion;
