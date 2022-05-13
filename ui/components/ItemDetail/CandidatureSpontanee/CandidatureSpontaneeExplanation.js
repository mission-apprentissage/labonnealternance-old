import ExternalLink from "@/components/externalLink";
import React from "react";

import { Collapse } from "reactstrap";

const CandidatureSpontaneeExplanation = (props) => {
  // Collapse Open state
  const [isOpen, setIsOpen] = React.useState(false);

  const getTitle = () => {
    let res = "";
    if (props.about == "what") {
      res = "Qu'est ce qu'une candidature spontanée ?";
    } else if (props.about == "how") {
      res = "Comment se préparer pour une candidature spontanée ? ";
    }
    return res;
  };

  const getText = () => {
    let res = "";
    if (props.about == "what") {
      res = (
        <p>
          L'entreprise n'a pas déposé d'offre d'emploi, vous pouvez tout de même lui envoyer votre CV pour lui indiquer
          que vous seriez très intéressé⸱e pour intégrer son équipe dans le cadre de votre apprentissage.
        </p>
      );
    } else if (props.about == "how") {
      res = (
        <>
          <p className="c-detail-lbb-paragraph">
            Adaptez votre lettre de motivation à l'entreprise aux informations recueillies : Activité, actualités et
            valeurs
          </p>
          <p className="c-detail-lbb-paragraph">
            Mettez en valeur vos qualités en lien avec le métier recherché et indiquez pourquoi vous souhaitez réaliser
            votre alternance dans cette entreprise en particulier.
            <br />
            <br />
            Besoin d'aide pour concevoir votre CV ? Il existe plusieurs outils gratuits :
            <br />
            <ExternalLink
              className="gtmCVLink gtmClicnjob"
              url="https://cv.clicnjob.fr/"
              title="https://cv.clicnjob.fr/"
            />
            <br />
            <ExternalLink
              className="gtmCVLink gtmCvdesigner"
              url="https://cvdesignr.com/fr"
              title="https://cvdesignr.com/fr"
            />
            <br />
            <ExternalLink
              className="gtmCVLink gtmCanva"
              url="https://www.canva.com/fr_fr/creer/cv/"
              title="https://www.canva.com/fr_fr/creer/cv/"
            />
          </p>
          <p className="c-detail-lbb-paragraph">Conseil : Allez voir le site de l'entreprise si elle en a un.</p>
        </>
      );
    }
    return res;
  };

  return (
    <>
      <div className="c-accordion">
        <button
          className="c-accordion-button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="c-accordion-button-title">{getTitle()}</span>
          <span className="c-accordion-button-plus">{isOpen ? "-" : "+"}</span>
        </button>
        <Collapse isOpen={isOpen} className="c-collapser">
          {getText()}
        </Collapse>
      </div>
    </>
  );
};

export default CandidatureSpontaneeExplanation;
