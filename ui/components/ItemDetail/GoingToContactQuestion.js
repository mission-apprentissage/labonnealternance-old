import React from "react";

import thumbup from "public/images/thumbup.svg";
import thumbdown from "public/images/thumbdown.svg";

const GoingToContactQuestion = ({  }) => {
  return (
    <>
      <span className="c-media-tag c-media-tag--thumb">
        <img src={thumbup} alt="oui : pouce vers le haut" />
        <span className="ml-1">oui</span>
      </span>
      <span className="c-media-tag c-media-tag--thumb ml-3">
        <img src={thumbdown} alt="non : pouce vers le bas" />
        <span className="ml-1">non</span>
      </span>
    </>
  );
};

export default GoingToContactQuestion;
