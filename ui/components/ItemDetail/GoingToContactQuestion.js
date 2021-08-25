import React, { useState, useEffect } from "react";

import thumbup from "public/images/thumbup.svg";
import thumbdown from "public/images/thumbdown.svg";
import { capitalizeFirstLetter } from "utils/strutils";

import {useSessionStorage} from "utils/useSessionStorage";

const GoingToContactQuestion = ({ kind, uniqId }) => {
console.log('key', key);

  const storeId = `goingto-${kind}-${uniqId}`

  const [thanks, setThanks] = useSessionStorage(storeId, false);

  return (
    <div className="c-goingto mt-4">
      <span className="c-goingto-title">Allez-vous contacter cet établissement ?</span>
      <div className="d-flex-center mt-2">
        {thanks ? (
          <>
            <span>Merci pour votre retour !</span>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`c-goingto-thumb gtmThumbUp gtm${capitalizeFirstLetter(kind)}`}
              onClick={() => {
                setThanks(true);
              }}>
              <img src={thumbup} alt="oui : pouce vers le haut" />
              <span className="ml-1">Oui</span>
            </button>
            <button
              type="button"
              className={`c-goingto-thumb ml-2 gtmThumbDown gtm${capitalizeFirstLetter(kind)}`}
              onClick={() => {
                setThanks(true);
              }}>
              <img src={thumbdown} alt="non : pouce vers le bas" />
              <span className="ml-1">Non</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoingToContactQuestion;
