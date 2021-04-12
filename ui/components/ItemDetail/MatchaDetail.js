import React, { useEffect } from "react";
import bulbIcon from "../../public/images/icons/bulb.svg";
import { get } from "lodash";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import ReactHtmlParser from "react-html-parser";
import { capitalizeFirstLetter } from "../../utils/strutils";

let md = require("markdown-it")().disable(["link", "image"]);

const MatchaDetail = ({ job, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const description = get(job, "job.description", undefined);
  //const creationDate = job?.job?.creationDate ? moment(job.job.creationDate).format("DD / MM / YYYY") : undefined;

  const kind = job?.ideaType;

  let contactEmail = job?.contact?.email;
  let contactPhone = job?.contact?.phone;

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
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
      <div>
        <div className="c-detail-company">
          {get(job, "company.name", ReactHtmlParser("<em>Entreprise non précisée</em>"))}
          <span className="c-detail-proposal"> propose actuellement cette offre</span>
        </div>
        <h2 className="c-detail-jobtitle">{get(job, "title", ReactHtmlParser("<em>Titre non précisé</em>"))}</h2>

        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Niveau requis</h3>
          <div className="c-detail-description-text">{job.diplomaLevel}</div>
        </div>

        {description ? (
          <div className="c-detail-description">
            <h3 className="c-detail-description-title">Description de l'offre</h3>
            <div className="c-detail-description-text">{ReactHtmlParser(md.render(description))}</div>
          </div>
        ) : (
          ""
        )}

        {contactPhone || contactEmail ? (
          <p className="d-flex mb-3">
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
          </p>
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
              {job.company.name}
            </a>
          </span>
        </p>

        <hr className="c-detail-header-separator" />

        <div className="c-detail-advice p-2">
          <img src={bulbIcon} alt="" />
          <div className="c-detail-advice-text">
            Diversifiez vos démarches en envoyant aussi des candidatures spontanées aux entreprises qui n'ont pas
            diffusé d'offre !
          </div>
        </div>

        <div className="mt-3">&nbsp;</div>
      </div>
    </>
  );
};

export default MatchaDetail;
