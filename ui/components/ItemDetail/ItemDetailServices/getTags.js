import { amongst } from "../../../utils/arrayutils";
import TagCandidatureSpontanee from "../TagCandidatureSpontanee";
import TagOffreEmploi from "../TagOffreEmploi";
import TagCfaDEntreprise from "../TagCfaDEntreprise";
import TagFormationAssociee from "../TagFormationAssociee";

export default function getTags({ kind, isCfa, isMandataire, hasAlsoJob }) {
  return (
    <div className="mr-auto c-tagcfa-container text-left">
      {kind === "formation" ? 
        <>
          <TagCfaDEntreprise isCfa={isCfa} /> 
          {hasAlsoJob ? 
            <span className="ml-2">
              <TagOffreEmploi hasAlsoJob/> 
            </span>
          : 
            <></> 
          }
        </>
        : 
        ""
      }
      {amongst(kind, ["lbb", "lba"]) ? <TagCandidatureSpontanee /> : ""}
      {amongst(kind, ["peJob", "matcha"]) ? <TagOffreEmploi /> : ""}
      {amongst(kind, ["matcha"]) && isMandataire ? <TagFormationAssociee isMandataire /> : ""}
    </div>
  );
};
