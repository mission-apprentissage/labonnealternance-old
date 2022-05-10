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
          <strong>Niveau requis :</strong> {
            job?.diplomaLevel ? 
            <>
                <div className="c-required-levels">
                  {job?.diplomaLevel.split(', ').map(function (d, idx) {
                    return (<span key={idx} className="c-required-level">{d}</span>)
                  })}
                </div>
            </> :
              "non défini"
            }
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
              Trouver et convaincre une entreprise de vous embaucher ? 

              <span className="c-detail-traininglink ml-1">
                <a
                  href="https://dinum-beta.didask.com/courses/demonstration/60d21bf5be76560000ae916e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtmDidask1"
                >
                  On vous donne des conseils ici pour vous aider !&nbsp;
                  <img src='../../images/icons/goto.svg' alt="Lien" />
                </a>
              </span>

              
            </p>
          </>
      }

    </>
  );
};

export default MatchaDetail;
