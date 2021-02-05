import React, { useEffect } from "react";
import bulbIcon from "../../public/images/icons/bulb.svg";
import gotoIcon from "../../public/images/icons/goto.svg";
import { get, includes, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";
import contactIcon from "../../public/images/icons/contact_icon.svg";

const LbbCompanyDetail = ({ lbb, seeInfo, setSeeInfo }) => {
  let siret = lbb?.company?.siret;
  let modificationLink = `https://labonneboite.pole-emploi.fr/verification-informations-entreprise/${siret}`;

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const kind = lbb?.ideaType;
  let contactEmail = lbb?.contact?.email;
  const companySize = lbb?.company?.size?.toLowerCase();
  let contactInfo = contactEmail ? (
    <span className="c-detail-km c-detail-pelink">
      <a href={`mailto:${contactEmail}`} className="ml-1" target="_blank" rel="noopener noreferrer">
        {contactEmail}
      </a>
    </span>
  ) : null;


  return (
    <>
    <div className="text-left">
        {kind === "formation" ? (
          contactInfo ? (
            <p className="d-flex mt-4">
              {seeInfo ? (
                <>
                  <span className="d-block">
                    <img className="cardIcon" src={contactIcon} alt="" />
                  </span>
                  <span className="ml-2 d-block">
                    <span className="c-detail-address d-block">{contactInfo}</span>
                  </span>
                </>
              ) : (
                <button
                  className="d-block btn btn-lg btn-dark w-75 font-weight-bold c-regular-darkbtn ml-3 mt-3"
                  onClick={() => setSeeInfo(true)}
                >
                  Voir les informations de contact
                </button>
              )}
            </p>
          ) : (
            ""
          )
        ) : (
          <p className="mb-4">
            <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
            <span className="c-detail-sizetext d-block">
              {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
            </span>
            {siret ? (
              <a
                target="lbb"
                href={`https://labonneboite.pole-emploi.fr/${siret}/details`}
                className="d-block btn btn-outline-primary w-50 mt-3 c-detail-seeinfo"
              >
                Voir les informations de contact
              </a>
            ) : (
              ""
            )}
          </p>
        )}
      </div>
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
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
                rel="noopener noreferrer"
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
