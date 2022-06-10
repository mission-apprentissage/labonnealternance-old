import React from "react";
import ExternalLink from "../externalLink";

const ConnectionActions = () => {
  return (
    <div className="my-4 mx-auto">
      <ExternalLink
        className="c-homecomponent-link c-homecomponent-link__first mr-1 mr-md-5"
        url="https://matcha.apprentissage.beta.gouv.fr/creation/entreprise"
        title="Déposer une offre"
      />
      <ExternalLink
        className="c-homecomponent-link c-homecomponent-link__clear"
        url="https://matcha.apprentissage.beta.gouv.fr/authentification"
        title="Me connecter"
      />
    </div>
  );
};
export default ConnectionActions;
