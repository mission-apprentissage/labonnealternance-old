import React from "react";

import smileyIcon from "public/images/smiley.svg";

const TagCfaEntreprise = (isCfa=false) => {
  return <>
    {isCfa ? 
      <span className="c-media-tag c-media-tag--smiley">
        <img src={smileyIcon} alt="sourire" />
        <span className="ml-1">CFA d'entreprise</span>
      </span>
      : 
      ""
    }
  </>
}

export default TagCfaEntreprise;
