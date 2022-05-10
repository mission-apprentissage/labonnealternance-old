import React from "react";

import smileyIcon from "public/images/smiley.svg";

const TagFormationAssociee = ({ isMandataire }) => {
  return (
    <>
      {isMandataire === true ? (
        <span className="c-media-tag c-media-tag--2nd c-media-tag--smiley">
          <img src={smileyIcon} alt="sourire" />
          <span className="ml-1">Formation associée</span>
        </span>
      ) : (
        ""
      )}
    </>
  );
};

export default TagFormationAssociee;
