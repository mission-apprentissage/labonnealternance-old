import React, { useEffect } from "react";
import questionmarkIcon from "public/images/icons/questionmark.svg";
import { get, defaultTo, random } from "lodash";
import ReactHtmlParser from "react-html-parser";
import TagCandidatureSpontanee from "components/ItemDetail/TagCandidatureSpontanee.js";
import { formatDate } from "utils/strutils";
import { SendTrackEvent } from "utils/gtm";
import DidAsk1 from "./DidAsk1";
import DidAsk2 from "./DidAsk2";
import GoingToContactQuestion from "./GoingToContactQuestion";
import { getItemId } from "utils/getItemId";

let md = require("markdown-it")().disable(["link", "image"]);

const PeJobDetail = ({ job }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage Offre PE - Consulter fiche entreprise`,
      itemId: job?.job?.id,
    });
  }, [job?.job?.id]);

  const description = get(job, "job.description", undefined);
  const contractDuration = get(job, "job.contractDescription", undefined);
  const contractRythm = get(job, "job.duration", undefined);
  const creationDate = job?.job?.creationDate ? formatDate(job.job.creationDate) : undefined;

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
          <div className="c-detail-metanature">Nature du contrat : Alternance</div>
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
            <div className="c-detail-advice-title">Le saviez-vous ?</div>
            <div className="c-detail-advice-text c-detail-advice-text--first">
              Diversifiez vos démarches en envoyant aussi des
              <span className="c-detail-advice-highlight"> candidatures spontanées </span>
              aux entreprises qui n'ont pas diffusé d'offre !
            </div>
            <div className="c-detail-advice-text c-detail-advice-text--tag">
              Repérez les tags suivants dans la liste de résultats
            </div>
            <div className="c-detail-advice-tag">
              <TagCandidatureSpontanee />
            </div>
            {!!random(0, 1) ? <DidAsk1 /> : <DidAsk2 />}
          </div>
        </div>
        
        <GoingToContactQuestion kind={kind} uniqId={getItemId(job)} key={getItemId(job)} />

        <div className="mt-5">&nbsp;</div>
      </div>
    </>
  );
};

export default PeJobDetail;
