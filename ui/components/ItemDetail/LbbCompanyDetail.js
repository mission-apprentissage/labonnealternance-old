import React, { useEffect } from "react";
import { SendPlausibleEvent } from "../../utils/gtm";
import CandidatureSpontaneeExplanation from "./CandidatureSpontanee/CandidatureSpontaneeExplanation";

const LbbCompanyDetail = ({ lbb }) => {
  useEffect(() => {
    SendPlausibleEvent("Affichage - Fiche entreprise Algo", {
      info_fiche: lbb?.company?.siret,
    });
  }, [lbb?.company?.siret]);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0]?.scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  return (
    <div className="c-detail-body mt-4">
      <div className="text-left" data-testid="lbb-component">
        <div className="mb-3">
          <CandidatureSpontaneeExplanation about={"what"} />
          <CandidatureSpontaneeExplanation about={"how"} />
        </div>
      </div>
    </div>
  );
};

export default LbbCompanyDetail;
