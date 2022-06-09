import React from "react";
import ExternalLink from "../externalLink";

const ConnectionActions = () => {
  return (
    <div className="my-4 mx-auto">
      <ExternalLink className="c-homecomponent-link c-homecomponent-link mr-5" url="" title="Déposer une offre" />
      <ExternalLink className="c-homecomponent-link c-homecomponent-link__clear" url="" title="Me connecter" />
    </div>
  );
};
export default ConnectionActions;
