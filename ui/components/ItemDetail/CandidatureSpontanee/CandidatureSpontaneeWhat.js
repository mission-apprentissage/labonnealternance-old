import React from "react";

import { Collapse } from "reactstrap"

const CandidatureSpontaneeWhat = (props) => {

  // Collapse Open state
  const [isOpen, setIsOpen] = React.useState(false);

  const getTitle = () => {
    let res = ''
    if (props.about == "what") {
      res = "Qu'est ce qu'une candidature spontanée ?"
    } else if (props.about == "how") {
      res = "Taille de l'entreprise"
    }
    return res
  }

  const getText = () => {
    let res = ''
    if (props.about == "what") {
      res = <p>
        L'entreprise n'a pas déposé d'offre d'emploi, vous pouvez tout de même lui envoyer votre CV pour lui indiquer que vous seriez très intéressé pour intégrer son équipe dans le cadre de votre apprentissage.
      </p>
    } else if (props.about == "how") {
      res = <>
        <p className="c-detail-lbb-paragraph">
          L'entreprise n'a pas déposé d'offre d'emploi, vous pouvez tout de même lui envoyer votre CV pour lui indiquer
          que vous seriez très intéressé pour intégrer son équipe dans le cadre de votre apprentissage.
        </p>

        <h2 className="c-detail-lbb-title">Comment se préparer pour une candidature spontanée ?</h2>
        <p className="c-detail-lbb-paragraph">
          Adaptez votre lettre de motivation à l'entreprise aux informations recueillies : Activité, actualités et
          valeurs
        </p>
        <p className="c-detail-lbb-paragraph">
          Mettez en valeur vos qualités en lien avec le métier recherché et indiquez pourquoi vous souhaitez réaliser
          votre apprentissage dans cette entreprise en particulier.
          <br />
          <br />
          Besoin d'aide pour concevoir votre CV ? Il existe plusieurs outils gratuits :
          <br />
          <a href="https://cv.clicnjob.fr/" className="gtmCVLink gtmClicnjob" rel="noopener noreferrer" target="_blank">
            https://cv.clicnjob.fr/
          </a>
          <br />
          <a
            href="https://cvdesignr.com/fr"
            className="gtmCVLink gtmCvdesigner"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://cvdesignr.com/fr
          </a>
          <br />
          <a
            href="https://www.canva.com/fr_fr/creer/cv/"
            className="gtmCVLink gtmCanva"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://www.canva.com/fr_fr/creer/cv/
          </a>
        </p>
        <p className="c-detail-lbb-paragraph">Conseil : Allez voir le site de l'entreprise si elle en a un.</p>
      </>
    }
    return res
  }

  return (
    <>
      <div className="c-accordion">
        <button className="c-accordion-button" onClick={() => {
          setIsOpen(!isOpen)
        }}>
          {getTitle()}
        </button>
        <Collapse isOpen={isOpen}>
          {getText()}
        </Collapse>
      </div >
    </>
  );

};

export default CandidatureSpontaneeWhat;
