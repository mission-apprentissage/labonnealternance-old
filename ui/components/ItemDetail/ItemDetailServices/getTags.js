import { amongst } from "../../../utils/arrayutils";
import TagCandidatureSpontanee from "../TagCandidatureSpontanee";
import TagOffreEmploi from "../TagOffreEmploi";
import TagOffreAssociee from "../TagOffreAssociee";
import TagCfaDEntreprise from "../TagCfaDEntreprise";
import TagFormationAssociee from "../TagFormationAssociee";
import TagFormation from "../TagFormation";

export default function getTags({ kind, isCfa, isMandataire, hasAlsoJob }) {
  return (
    <div className="mr-auto c-tagcfa-container text-left">
      {kind === "formation" ? 
        <>
          {isCfa ? <TagCfaDEntreprise /> : <></> }
          {hasAlsoJob ? 
            <span className={isCfa ? 'ml-2' : 'ml-0'}>
              <TagOffreAssociee/> 
            </span>
          : 
            <>
              <TagFormation />
            </> 
          }
        </>
        : 
        <></> 
      }
      {amongst(kind, ["lbb", "lba"]) ? <TagCandidatureSpontanee /> : ""}
      {amongst(kind, ["peJob", "matcha"]) ? <TagOffreEmploi /> : ""}
      {amongst(kind, ["matcha"]) && isMandataire ? <TagFormationAssociee isMandataire /> : ""}
    </div>
  );
};
