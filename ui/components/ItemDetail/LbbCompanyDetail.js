import React, { useEffect } from "react";
import { SendTrackEvent } from "../../utils/gtm";
import CandidatureSpontaneeExplanation from "./CandidatureSpontanee/CandidatureSpontaneeExplanation";

const LbbCompanyDetail = ({ lbb }) => {

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

  return (
    <>
      <div className="text-left" data-testid="lbb-component">
        <div className="mb-3">
          <CandidatureSpontaneeExplanation about={"what"} />
          <CandidatureSpontaneeExplanation about={"how"} />
        </div>
      </div>
    </>
  );
};

export default LbbCompanyDetail;
