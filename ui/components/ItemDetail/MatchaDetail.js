import React, { useEffect } from "react";
import questionmarkIcon from "public/images/icons/questionmark.svg";
import { get, random } from "lodash";
import contactIcon from "public/images/icons/contact_icon.svg";
import ReactHtmlParser from "react-html-parser";
import { SendTrackEvent } from "utils/gtm";
import { isNonEmptyString, capitalizeFirstLetter } from "utils/strutils";
import DidAsk1 from "./DidAsk1";
import DidAsk2 from "./DidAsk2";

import GoingToContactQuestion, { getGoingtoId } from "./GoingToContactQuestion";


let md = require("markdown-it")().disable(["link", "image"]);

const MatchaDetail = ({ job, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage Offre Matcha - Consulter fiche entreprise`,
      itemId: job?.job?.id,
    });
  }, [job?.job?.id]);

  const description = get(job, "job.description", undefined);

  const kind = job?.ideaType;

  let contactEmail = job?.contact?.email;
  let contactPhone = job?.contact?.phone;

  const jobTitle =  get(job, "title", ReactHtmlParser("<em>Titre non précisé</em>"))

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
    return encodeURIComponent(`${job.company.name} ${job.place.address}`);
  };

  return (
    <>
      {contactPhone || contactEmail ? (
        <div className="d-flex">
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
                className={`c-see-info c-see-info--matcha d-block btn btn-outline-primary gtmContact gtm${capitalizeFirstLetter(kind)}`}
              onClick={() => setSeeInfo(true)}
            >
              Voir les informations de contact
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      <p className="text-left">
        <span className={"d-block c-detail-sizetext c-detail-sizetext--" + kind}>
          <img className="mt-n1" src="/images/info.svg" alt="information" />
          <span className="ml-2 c-detail-knowmore">En savoir plus sur </span>
          <a
            href={`https://www.google.fr/search?q=${getGoogleSearchParameters()}`}
            target="_blank"
            className="c-detail-google-search gtmGoogleLink"
            rel="noopener noreferrer"
          >
            {job.company.name}
          </a>
        </span>
      </p>
      <hr className={"mb-4 c-detail-header-separator c-detail-header-separator--" + kind} />
      <div>
        <div className="c-detail-company position-relative">
          <span className="c-detail-square">
            &nbsp;
          </span>
          <span className="d-inline-block ml-2">
            {get(job, "company.name", ReactHtmlParser("<em>Entreprise non précisée</em>"))}
          </span>
          <span className="c-detail-proposal"> propose actuellement cette offre</span>
        </div>
        <h2 className="c-detail-jobtitle">{jobTitle}</h2>

        <div className="c-detail-description">
          <h3 className="c-detail-description-title c-detail-description-title--matcha1">Niveau requis</h3>
          {
            isNonEmptyString(job?.diplomaLevel) ? 
              job.diplomaLevel.split(", ").map(diploma => {
                return <div className="c-detail-diploma d-inline-block">{diploma}</div>
              })
            :
            "Non défini"
          }
        </div>

        {description ? (
          <div className="c-detail-description">
            <h3 className="c-detail-description-title">Description de l'offre</h3>
            <div className="c-detail-description-text">{ReactHtmlParser(md.render(description))}</div>
          </div>
        ) : (
          ""
        )}


        <hr className="c-detail-header-separator" />

        <div className="c-detail-advice c-detail-advice--matcha">
          <div className="c-detail-advice__figure">
            <img src={questionmarkIcon} alt="point d'interrogation" />
          </div>
          <div className="c-detail-advice__body">
            <div className="c-detail-advice-text mt-0">
              L'entreprise <span className="c-detail-advice-highlight"> {job.company.name} </span> nous a récemment fait parvenir un besoin de recrutement :  
              <span className="c-detail-advice-highlight"> {jobTitle}</span>.
              Cela signifie qu’elle est activement à la recherche d’un.e candidat.e pour rejoindre son équipe.
            </div>
            <div className="c-detail-advice-text c-detail-advice-text--tag">
              Vous avez donc tout intérêt à la contacter rapidement, avant que l’offre ne soit pourvue !
            </div>
            {!!random(0, 1) ? <DidAsk1 /> : <DidAsk2 />}
          </div>
        </div>

        <GoingToContactQuestion kind={kind} uniqId={getGoingtoId(kind, job)} key={getGoingtoId(kind, job)} />

        <div className="mt-3">&nbsp;</div>
      </div>
    </>
  );
};

export default MatchaDetail;
