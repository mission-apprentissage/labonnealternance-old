import React from "react";

import thumbup from "public/images/thumbup.svg";
import thumbdown from "public/images/thumbdown.svg";

const GoingToContactQuestion = ({  }) => {
  return (
    <div className="">
      <button type="button" className="c-button-thumb">
        <img src={thumbup} alt="oui : pouce vers le haut" />
        <span className="">oui</span>
      </button>
      <button type="button" className="c-button-thumb ml-2">
        <img src={thumbdown} alt="non : pouce vers le bas" />
        <span className="">non</span>
      </button>
    </div>
  );
};

export default GoingToContactQuestion;
