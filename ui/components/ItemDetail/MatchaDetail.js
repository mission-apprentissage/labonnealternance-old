import React, { useEffect } from "react";
import { SendTrackEvent } from "../../utils/gtm";
import { formatDate } from "../../utils/strutils";

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




  const jobStartDate = job?.job?.jobStartDate ? formatDate(job.job.jobStartDate) : undefined;


  const getGoogleSearchParameters = () => {
    return encodeURIComponent(`${job.company.name} ${job.place.address}`);
  };

  return (
    <>
      <h2 className="c-locationdetail-title mt-2">Description de l'offre</h2>
      <div className="c-matcha-detail-container">
        <div>
          <strong>Début du contrat le : </strong> {jobStartDate}
        </div>
        <div className="my-2">
          <strong>Nature du contrat : </strong> {getContractTypes(job?.job?.contractType)}
        </div>
        <div>
          <strong>Niveau requis :</strong> non défini
        </div>
      </div>
      {
        job?.company?.mandataire ?
          <>
            <p>
              Offre publiée par <span className="c-detail-bolded">{job.company.name}</span> pour une entreprise partenaire du centre de formation.
            </p>
          </>
        :
          <>
            <p>
              <span className="c-detail-bolded">{job.company.name}</span>  nous a récemment fait parvenir un besoin de recrutement :  <span className="c-detail-bolded">{job.title}</span>. Cela signifie que l'établissement est activement à la recherche d'un.e candidat.e.
            </p>
            <p>
              Vous avez donc tout intérêt à le contacter rapidement, avant que l'offre ne soit pourvue !
            </p>
            <p>
              Trouver et convaincre une entreprise de vous embaucher ? On vous donne des conseils ici pour vous aider !
            </p>
          </>
      }

    </>
  );
};

export default MatchaDetail;
