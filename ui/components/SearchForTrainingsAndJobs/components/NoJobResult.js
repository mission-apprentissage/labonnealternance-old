import React from "react";
import { useScopeContext } from "context/ScopeContext";

const NoJobResult = () => {
  const scopeContext = useScopeContext();

  return scopeContext.isJob ? <div className="bold">Aucune entreprise trouvée</div> : "";
};

export default NoJobResult;
