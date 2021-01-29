import React, { useEffect } from "react";
import bulbIcon from "../../public/images/icons/bulb.svg";
import gotoIcon from "../../public/images/icons/goto.svg";
import { get, includes, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";

const LbbCompanyDetail = ({ lbb }) => {
  console.log("lbb : ", lbb);

  let siret = lbb?.company?.siret;
  let modificationLink = `https://labonneboite.pole-emploi.fr/verification-informations-entreprise/${siret}`;

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
      <div className="c-detail-lbb-siretzone">
        <div className="c-detail-lbb-siretno p-0 m-0">N° de siret</div>
        <div className="c-detail-lbb-siretactual p-0 m-0">
          {defaultTo(siret, ReactHtmlParser("<em>Non renseigné</em>"))}
        </div>
        {siret ? (
          <div className="c-detail-lbb-siretok">
            <div className="c-detail-lbb-siretno">C'est mon entreprise</div>
            <div className="c-detail-lbb-siretaction">
              <a
                className="btn btn-outline-primary c-detail-lbb-siretbutton px-1 px-sm-3 c-home-descr__more"
                target="_blank"
                rel="noopener noreferer"
                href={modificationLink}
              >
                <img src={gotoIcon} alt="Aller à" />
                <span className="c-detail-lbb-siretbutton d-inline px-1 px-sm-0 ml-2">Modifier les informations </span>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default LbbCompanyDetail;
