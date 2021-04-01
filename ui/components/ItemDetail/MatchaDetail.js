import React, { useEffect } from "react";
import moment from "moment";
import bulbIcon from "../../public/images/icons/bulb.svg";
import { get, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";

let md = require("markdown-it")().disable(["link", "image"]);

const MatchaDetail = ({ job, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const description = get(job, "job.description", undefined);
  const creationDate = job?.job?.creationDate ? moment(job.job.creationDate).format("DD / MM / YYYY") : undefined;

  const kind = job?.ideaType;

  return (
    <>
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
      <div>
        <div className="c-detail-company">
          {get(job, "company.name", ReactHtmlParser("<em>Entreprise non précisée</em>"))}
          <span className="c-detail-proposal"> propose actuellement cette offre</span>
        </div>
        <h2 className="c-detail-jobtitle">{get(job, "title", ReactHtmlParser("<em>Titre non précisé</em>"))}</h2>
        <div className="c-detail-meta">
          <div className="c-detail-metadate">
            Publiée le : {defaultTo(creationDate, ReactHtmlParser("<em>Donnée manquante</em>"))}
          </div>
        </div>

        {description ? (
          <div className="c-detail-description">
            <h3 className="c-detail-description-title">Description de l'offre</h3>
            <div className="c-detail-description-text">{ReactHtmlParser(md.render(description))}</div>
          </div>
        ) : (
          ""
        )}

        <hr className="c-detail-header-separator mt-5" />

        <h3 className="c-detail-description-title">Postuler</h3>

        <div className="c-detail-pelink mt-3">
          <a className="gtmContactPE" target="poleemploi" href={job.url}>
            Contactez le recruteur sur Matcha
          </a>
        </div>

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
