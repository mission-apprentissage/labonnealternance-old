import React, { useEffect } from "react";
import questionmarkIcon from "public/images/icons/questionmark.svg";
import gotoIcon from "public/images/icons/goto.svg";
import { defaultTo, random } from "lodash";
import ReactHtmlParser from "react-html-parser";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { capitalizeFirstLetter } from "../../utils/strutils";
import { SendTrackEvent } from "utils/gtm";
import DidAsk1 from "./DidAsk1";
import DidAsk2 from "./DidAsk2";

const LbbCompanyDetail = ({ lbb, seeInfo, setSeeInfo }) => {
  let siret = lbb?.company?.siret;
  let modificationLink = `https://labonneboite.pole-emploi.fr/verification-informations-entreprise/${siret}`;

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage ${lbb?.ideaType.toUpperCase()} - Consulter fiche entreprise`,
      itemId: lbb?.company?.siret,
    });
  }, [lbb?.company?.siret]);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const kind = lbb?.ideaType;
  let contactEmail = lbb?.contact?.email;
  let contactPhone = lbb?.contact?.phone;

  let companySize = lbb?.company?.size?.toLowerCase();
  if (companySize.startsWith("0")) {
    companySize = "petite entreprise";
  }

  let contactInfo = (
    <>
      {contactEmail ? (
        <p className="c-detail-km c-detail-contactlink">
          <a href={`mailto:${contactEmail}`} className="ml-1">
            {contactEmail}
          </a>
        </p>
      ) : (
        ""
      )}
      {contactPhone ? (
        <p className="c-detail-km c-detail-contactlink">
          <a href={`tel:${contactPhone}`} className="ml-1">
            {contactPhone}
          </a>
        </p>
      ) : (
        ""
      )}
    </>
  );

  const getGoogleSearchParameters = () => {
    return encodeURIComponent(`${lbb.title} ${lbb.place.address}`);
  };

  return (
    <>
      <div className="text-left">
        <p className="mb-3">
          <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
          <span className="c-detail-sizetext d-block">
            {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
          </span>
        </p>
        {contactPhone || contactEmail ? (
          <div className="d-flex mb-3">
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
                className={`c-see-info d-block btn btn-outline-primary gtmContact gtm${capitalizeFirstLetter(kind)}`}
                onClick={() => setSeeInfo(true)}
              >
                Voir les informations de contact
              </button>
            )}
          </div>
        ) : (
          ""
        )}
        <p className="mb-3 text-left">
          <span className="c-detail-sizetext d-block">
            <img className="mt-n1" src="/images/square_link.svg" alt="" />
            <span className="ml-2">En savoir plus sur </span>
            <a
              href={`https://www.google.fr/search?q=${getGoogleSearchParameters()}`}
              target="_blank"
              className="c-detail-google-search gtmGoogleLink"
              rel="noopener noreferrer"
            >
              {lbb.title}
            </a>
          </span>
        </p>
      </div>
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
      <div className="c-detail-body">
        <div className="c-detail-advice p-2">
          <img src={questionmarkIcon} alt="point d'interrogation" />
          <div className="c-detail-advice-text text-left mt-0 ml-2">
            <p>Cette entreprise a des salariés qui exercent le métier auquel vous vous destinez.</p>
            <p className="mb-0">
              Faites-lui découvrir les avantages d'un recrutement en alternance dans votre candidature !
            </p>
            {!!random(0, 1) ? <DidAsk1 /> : <DidAsk2 />}
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
        <div className="c-detail-lbb-siretactual p-0 mt-2">
          {defaultTo(siret, ReactHtmlParser("<em>Non renseigné</em>"))}
        </div>
        {siret ? (
          <div className="c-detail-lbb-siretok">
            <div className="c-detail-lbb-siretno">C'est mon entreprise</div>
            <div className="c-detail-lbb-siretaction mt-2">
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
