import React, { useEffect } from "react";
import moment from "moment";
import questionmarkIcon from "../../public/images/icons/questionmark.svg";
import { get, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";
import TagCandidatureSpontanee from "components/ItemDetail/TagCandidatureSpontanee.js";

let md = require("markdown-it")().disable(["link", "image"]);

const PeJobDetail = ({ job, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const description = get(job, "job.description", undefined);
  const contractDuration = get(job, "job.contractDescription", undefined);
  const contractRythm = get(job, "job.duration", undefined);
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
          <div className="c-detail-metanature">
            Nature du contrat : Alternance
          </div>
          <div className="c-detail-metaduration">
            Durée : {defaultTo(contractDuration, ReactHtmlParser("<em>Donnée manquante</em>"))}
          </div>
          <div className="c-detail-metarythm">
            Rythme : {defaultTo(contractRythm, ReactHtmlParser("<em>Donnée manquante</em>"))}
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

        <div className="c-detail-advice">
          <div className="c-detail-advice__figure">
            <img src={questionmarkIcon} alt="point d'interrogation" />
          </div>
          <div className="c-detail-advice__body">
            <div className="c-detail-advice-title">
              Le saviez-vous ?
            </div>
            <div className="c-detail-advice-text c-detail-advice-text--first" >
              Diversifiez vos démarches en envoyant aussi des
              <span className="c-detail-advice-highlight"> candidatures spontanées </span>
              aux entreprises qui n'ont pas diffusé d'offre !
            </div>
            <div className="c-detail-advice-text c-detail-advice-text--tag" >
              Repérez les tags suivants dans la liste de résultats
            </div>
            <div className="c-detail-advice-tag" >
              <TagCandidatureSpontanee />
            </div>
          </div>
        </div>


        <div className="mt-5">&nbsp;</div>
      </div>
    </>
  );
};

export default PeJobDetail;
