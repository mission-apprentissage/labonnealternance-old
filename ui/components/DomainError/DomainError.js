import React from "react";

import domainErrorMainSvg from "./domain_error_main.svg";
import domainErrorNoticeSvg from "./domain_error_notice.svg";

export default function DomainError({ position }) {
  const getInColumnError = () => {
    return (
      <div className="c-domainerror px-3">
        <div className="c-domainerror-img">
          <img src={domainErrorMainSvg} alt="Ressource non trouvée" />
        </div>
        <div className="c-domainerror-notice mb-2">
          <img className="c-domainerror-notice-img mr-2" src={domainErrorNoticeSvg} alt="Erreur technique momentanée" />
          Erreur technique momentanée
        </div>
        <div className="c-domainerror-texttitle">Pas de panique !</div>
        <div className="c-domainerror-textline1">Il y a forcément un résultat qui vous attend,</div>
        <div className="c-domainerror-textline2">veuillez revenir ultérieurement</div>
      </div>
    );
  };

  const getInHeaderError = () => {
    return (
      <div className="c-domainerror">
        <div className="c-domainerror-notice mb-2 float-left">
          <img className="c-domainerror-notice-img mr-2" src={domainErrorNoticeSvg} alt="Erreur technique momentanée" />
          Erreur technique momentanée
        </div>
        <div className="c-domainerror-texttitle float-left ml-4 mt-1">Veuillez réessayer ultérieurement</div>
      </div>
    );
  };

  return position && position === "header" ? getInHeaderError() : getInColumnError();
}
