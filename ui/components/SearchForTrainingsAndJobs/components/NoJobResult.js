import React, { useContext } from "react";
//import { useScopeContext } from "../../../context/ScopeContext";
import { ScopeContext } from "../../../context/ScopeContext";

const NoJobResult = () => {
  //const scopeContext = useScopeContext();
  const scopeContext = useContext(ScopeContext);

  return scopeContext.isJob ? <div className="bold">Aucune entreprise trouvée pour votre recherche</div> : "";
};

export default NoJobResult;
