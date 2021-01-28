import React, { useEffect } from "react";
import bulbIcon from "../../public/images/icons/bulb.svg";

const LbbCompanyDetail = ({ company }) => {
  console.log("lbb : ", company);

  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="c-detail-body">
        <div className="c-detail-advice p-2">
          <img src={bulbIcon} alt="" />
          <div className="c-detail-advice-text">
            <p>Cette entreprise a des salariés qui exercent le métier auquel vous vous destinez.</p>
            <p className="mb-0">
              Faites-lui découvrir les avantages d'un recrutement en alternance dans votre candidature !
            </p>
          </div>
        </div>

        <h2 className="c-detail-lbb-title">Qu'est ce qu'une candidature spontanée ?</h2>
        <p className="c-detail-lbb-paragraph">
          L'entreprise n'a pas déposé d'offre d'emploi, vous pouvez tout de même lui envoyer votre CV pour lui indiquer
          que vous seriez très intéressé pour intégrer son équipe dans le cadre de votre apprentissage.
        </p>

        <h2 className="c-detail-lbb-title">Comment se préparer pour une candidature spontanée ?</h2>
        <p className="c-detail-lbb-paragraph">
          Adaptez votre lettre de motivation à l'entreprise aux informations recueillies : Activité, actualités et
          valeurs
        </p>
        <p className="c-detail-lbb-paragraph">Conseil : Allez voir le site de l'entreprise si elle en a un.</p>

        <h2 className="c-detail-lbb-title">Quels sont les avantages pour l’employeur ? </h2>
        <ul className="c-detail-lbb-ul">
          <li className="c-detail-lbb-li">Une embauche à coût très réduit grâce aux aides existantes</li>
          <li className="c-detail-lbb-li">
            Un moyen de former à ses métiers et d'anticiper un besoin de main d'oeuvre
          </li>
          <li className="c-detail-lbb-li">
            La valorisation des compétences de ses salariés, en leur confiant un apprenti et en reconnaissant leur
            capacité de transmettre un métier
          </li>
        </ul>
      </div>
    </>
  );
};

export default LbbCompanyDetail;
