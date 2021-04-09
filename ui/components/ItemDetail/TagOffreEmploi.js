import React from "react";

import briefcaseIcon from "public/images/briefcase.svg";

const TagOffreDemploi = () => {
  return <span className="c-media-tag c-media-tag--briefcase">
    <img src={briefcaseIcon} alt="valise" />
    <span className="ml-1">Offre d'emploi</span>
  </span>
}

export default TagOffreDemploi;
