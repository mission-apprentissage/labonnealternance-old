import React, { useState, useEffect } from "react";

import thumbup from "public/images/thumbup.svg";
import thumbdown from "public/images/thumbdown.svg";
import { capitalizeFirstLetter } from "../../utils/strutils";

import { useSessionStorage } from "../../utils/useSessionStorage";
import { getItemId } from "../../utils/getItemId";



const GoingToContactQuestion = ({ kind, uniqId }) => {

  const [thanks, setThanks] = useSessionStorage(uniqId, false);

  return (
    <div className="c-detail-body c-goingto mt-4" data-testid="GoingToContactQuestion">
      <div className="c-goingto-title">Allez-vous contacter cet entreprise ?</div>
      <div className="">
        {thanks ? (
          <>
            <div className="c-goingto-thanks mt-3">
              <span>Merci pour votre réponse ! 👌</span>
            </div>
          </>
        ) : (
          <>
            <div className="c-goingto-buttons">
              <button
                type="button"
                className={`c-goingto-thumb gtmThumbUp gtm${capitalizeFirstLetter(kind)}`}
                onClick={() => {
                  setThanks(true);
                }}>
                <span className="ml-1">👍 Oui</span>
              </button>
              <button
                type="button"
                className={`c-goingto-thumb gtmThumbDown gtm${capitalizeFirstLetter(kind)}`}
                onClick={() => {
                  setThanks(true);
                }}>
                <span className="ml-1">👎 Non</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export function getGoingtoId(kind, item) {
  return `goingto-${kind}-${getItemId(item)}`
}

export default GoingToContactQuestion;
