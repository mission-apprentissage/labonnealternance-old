import dayjs from "dayjs";
import { defaultTo, get, random } from "lodash";
import contactIcon from "public/images/icons/contact_icon.svg";
import questionmarkIcon from "public/images/icons/questionmark.svg";
import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { SendTrackEvent } from "../../utils/gtm";
import { capitalizeFirstLetter, formatDate, isNonEmptyString } from "../../utils/strutils";
import CandidatureSpontanee from "./CandidatureSpontanee/CandidatureSpontanee";
import DidAsk1 from "./DidAsk1";
import DidAsk2 from "./DidAsk2";
import GoingToContactQuestion, { getGoingtoId } from "./GoingToContactQuestion";

let md = require("markdown-it")().disable(["link", "image"]);

const getContractTypes = (contractTypes) => {
  return contractTypes instanceof Array ? contractTypes.join(", ") : contractTypes;
};

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

  const jobTitle = get(job, "title", ReactHtmlParser("<em>Titre non précisé</em>"));
  const jobStartDate = job?.job?.creationDate ? formatDate(job.job.jobStartDate) : undefined;
  const contractType = get(job, "job.contractType", undefined);
  const romeDefinition = job?.job?.romeDetails?.definition.split("\\n");
  const romeCompetence = get(job, "job.romeDetails.competencesDeBase", undefined);
  const trancheEffectif = get(job, "company.size", undefined);
  const dateCreationEtablissement = get(job, "company.creationDate", undefined);
  const dateCreationEtablissementFormated = dayjs(dateCreationEtablissement).format("DD/MM/YYYY");
  const libelleNaf = get(job, "nafs[0].label", undefined);
  const rythmeAlternance = get(job, "job.rythmeAlternance", undefined);
  const elligibleHandicapBoolean = get(job, "job.elligibleHandicap", undefined);
  const elligibleHandicap = elligibleHandicapBoolean && "Oui";
  const dureeContrat = get(job, "job.dureeContrat", undefined);
  const quantiteContrat = get(job, "job.quantiteContrat", undefined);

  let contactInfo = (
    <>
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
      <h2 className="c-locationdetail-title mt-2">Description de l'offre</h2>
      <div className="c-matcha-detail-container">
        <div>
          <strong>Début du contrat le :</strong>
        </div>
        <div>
          <strong>Nature du contrat :</strong>
        </div>
        <div>
          <strong>Niveau requis :</strong>
        </div>
      </div>
      <p>
        {job.company.name}  nous a récemment fait parvenir un besoin de recrutement :  Coiffure, CAP / BEP. Cela signifie que l'établissement est activement à la recherche d'un.e candidat.e.
      </p>
      <p>
        Vous avez donc tout intérêt à le contacter rapidement, avant que l'offre ne soit pourvue !
      </p>
      <p>
        Trouver et convaincre une entreprise de vous embaucher ? On vous donne des conseils ici pour vous aider !
      </p>
    </>
  );
};

export default MatchaDetail;
