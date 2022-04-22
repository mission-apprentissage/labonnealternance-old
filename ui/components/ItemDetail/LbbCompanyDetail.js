import React, { useEffect } from "react";
import questionmarkIcon from "public/images/icons/questionmark.svg";
import { defaultTo, random } from "lodash";
import ReactHtmlParser from "react-html-parser";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { capitalizeFirstLetter, isNonEmptyString } from "../../utils/strutils";
import { SendTrackEvent } from "../../utils/gtm";
import DidAsk1 from "./DidAsk1";
import DidAsk2 from "./DidAsk2";
import CandidatureSpontaneeExplanation from "./CandidatureSpontanee/CandidatureSpontaneeExplanation";

const LbbCompanyDetail = ({ lbb, seeInfo, setSeeInfo }) => {
  let siret = lbb?.company?.siret;

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage ${lbb?.ideaType.toUpperCase()} - Consulter fiche entreprise`,
      itemId: lbb?.company?.siret,
    });
  }, [lbb?.company?.siret]);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0]?.scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const kind = lbb?.ideaType;
  let contactPhone = lbb?.contact?.phone;

  let companySize = lbb?.company?.size?.toLowerCase();
  if (!companySize) {
    companySize = "non renseigné";
  } else if (companySize.startsWith("0")) {
    companySize = "petite entreprise";
  } else {
    companySize = `${companySize.split("-")[0]} à ${companySize.split("-")[1]} salariés`;
  }

  let contactInfo = (
    <>
      {contactPhone ? (
        <p className="c-detail-km c-detail-contactlink">
          <a href={`tel:${contactPhone}`} className="ml-1">
            {contactPhone}
          </a>
        </p>
      ) : (
        ""
      )}
    </>
  );

  const getGoogleSearchParameters = () => {
    return encodeURIComponent(`${lbb.title} ${lbb.place.address}`);
  };

  return (
    <>
      <div className="text-left">
        <p className="mb-3">
          <CandidatureSpontaneeExplanation about={"what"}/>
          <CandidatureSpontaneeExplanation about={"how"}/>
        </p>
      </div>
    </>
  );
};

export default LbbCompanyDetail;
