import React, { useEffect } from "react";
import infoIcon from "../../public/static/icons/info.svg";
import lightbulbIcon from "../../public/static/icons/lightbulb.svg";
import linkIcon from "../../public/static/icons/link.svg";

const LbbCompanyDetail = ({ company }) => {
  //console.log("lbb : ", company);

  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="itemDetailBody">
        <div className="title">En savoir plus</div>
        <span className="bold">{company.name}</span>{" "}
        {company.ideaType === "lba"
          ? "a déjà pris des apprenti-e-s par le passé !"
          : "a des salariés qui exercent le métier auquel vous vous destinez !"}
        <br />
        <br />
        {company.company.website ? (
          <>
            Site Internet :{" "}
            <a href={company.company.website} target="_blank" rel="noopener noreferrer">
              {company.company.website}
            </a>
            <br />
            <br />
          </>
        ) : (
          ""
        )}
        <div className="sectionTitle">
          Voir la fiche entreprise sur le site {company.ideaType === "lba" ? "La Bonne Alternance" : "La Bonne Boîte"}
        </div>
        <div className="ellipsisLink">
          <img className="linkIcon" src={linkIcon} alt="" />
          <a target="lbb" href={company.url} className={`gtmFiche${company.ideaType}`}>
            https://{company.ideaType === "lba" ? "labonnealternance" : "labonneboite"}
            .pole-emploi.fr/details-entreprises
          </a>
        </div>
        <div className="blueAdvice">
          <img src={infoIcon} alt="" />
          <span className="bold">C'est quoi une candidature spontanée ?</span>
          <br />
          <br />
          L'entreprise n'a pas déposé d'offre d'emploi, vous pouvez tout de même lui envoyer votre CV pour lui indiquer
          que vous seriez très intéressé pour intégrer son équipe dans le cadre de votre alternance.
        </div>
        <div className="pinkAdvice">
          <img src={lightbulbIcon} alt="" />
          <span className="bold">Comment se préparer pour une candidature spontanée ?</span>
          <br />
          <ul>
            <li>
              Adaptez votre lettre de motivation à l'entreprise et aux informations recueillies : activité, actualités
              et valeurs.
              <br />
              Conseil : Allez voir le site de l'entreprise si elle en a un.
            </li>
            <li>
              Mettez en valeur vos qualités en lien avec le métier recherché et indiquez pourquoi vous souhaitez
              réaliser votre apprentissage dans cette entreprise en particulier.
            </li>
            <li className="ellipsisLink">
              Besoin d'aide pour concevoir votre CV ? Il existe plusieurs outils gratuits :
              <br />
              <a href="https://cv.clicnjob.fr/" target="outilCV" className="gtmCVLink gtmClicnjob">
                https://cv.clicnjob.fr/
              </a>
              <br />
              <a href="https://cvdesignr.com/fr" target="outilCV" className="gtmCVLink gtmCvdesigner">
                https://cvdesignr.com/fr
              </a>
              <br />
              <a href="https://www.canva.com/fr_fr/creer/cv/" target="outilCV" className="gtmCVLink gtmCanva">
                https://www.canva.com/fr_fr/creer/cv/
              </a>
              <br />
            </li>
          </ul>
        </div>
        {company.ideaType === "lbb" ? (
          <div className="blueAdvice">
            <span className="bold">Les avantages que cet employeur va obtenir en vous recrutant en apprentissage</span>
            <br />
            <br />
            Faites découvrir à cette entreprise les avantages d'un recrutement en apprentissage :
            <br />
            <ul>
              <li>une embauche à coût très réduit car des aides existent</li>
              <li>un moyen de former à vos métiers et d'anticiper un besoin de main d'oeuvre</li>
              <li>
                la reconnaissance de la capacité de transmettre un métier et valoriser les compétences de vos salariés
                en leur confiant un apprenti.
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default LbbCompanyDetail;
