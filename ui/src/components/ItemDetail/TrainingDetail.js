import React, { useEffect } from "react";
import infoIcon from "../../assets/icons/info.svg";
import FakeFeature from "../FakeFeature/FakeFeature";

const TrainingDetail = ({ training }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="itemDetailBody">
        <div className="title">En savoir plus</div>

        {training.onisepUrl ? (
          <div className="ellipsisLink">
            Descriptif du{" "}
            <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="gtmOnisep">
              {training.title ? training.title : training.longTitle}
            </a>{" "}
            sur le site Onisep
            <br />
            <br />
          </div>
        ) : (
          ""
        )}

        {training.contact && training.contact.email ? (
          <>
            <div className="sectionTitle">Email de contact:</div>
            <br />
            <a href={`mailto://${training.contact.email}`}>{training.contact.email}</a>
          </>
        ) : (
          ""
        )}

        <div className="blueAdvice">
          <div className="floatLeft">
            <img src={infoIcon} alt="" />
          </div>
          <div className="paragraph">
            Vous consultez une version BETA
            <br />
            D'autres informations seront disponibles sur cette page prochainement
          </div>
        </div>
        <FakeFeature
          buttonText="Prendre RDV avec l'établissement"
          tagName="tmsPriseDeRendezVous"
          modalTitle="Cette fonctionnalité n'est pas encore disponible"
          modalText={
            <>
              Votre clic nous est utile : il permet de mesurer votre intérêt pour la prise de rendez-vous en ligne !
              <br />
              <br />
              comment préféreriez-vous prendre RDV avec l'établissement :{" "}
            </>
          }
          questionsAndTags={[
            { question: "1) en choisissant des créneaux dans 1 agenda", tagName: "tmsPriseDeRendezVousParAgenda" },
            { question: "2) en envoyant une demande de RDV par mail", tagName: "tmsPriseDeRendezVousParMail" },
            {
              question: "3) en demandant à être rappelé ou en appelant l'établissement",
              tagName: "tmsPriseDeRendezVousParTelephone",
            },
          ]}
        />
      </div>
    </>
  );
};

export default TrainingDetail;
