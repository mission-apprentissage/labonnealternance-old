import React, { useEffect, useState } from "react";
import FakeFeature from "../FakeFeature/FakeFeature";
import infoIcon from "../../assets/icons/info.svg";
import thumbUpIcon from "../../assets/icons/fake_feature_thumbup.svg";
import wipIcon from "../../assets/icons/fake_feature_wip.svg";
import "./FakeFeature.css";

const TrainingDetail = ({ training }) => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);

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
        {
          <FakeFeature
            buttonText="Prendre contact"
            tagName="tmsPriseDeRendezVous"
            isOptionSelected={isOptionSelected}
            setIsOptionSelected={setIsOptionSelected}
            modalTitleBeforeSelection={
              <>
                <img src={wipIcon} alt="wip up icon" />
                <span>
                  La <strong>prise de rendez-vous en ligne</strong> est en cours de construction
                </span>
              </>
            }
            modalTextBeforeSelection={<>Est-ce que vous auriez aimé... : </>}
            questionsAndTags={[
              {
                question: "Choisir un créneau dans l'agenda de l'établissement",
                tagName: "tmsPriseDeRendezVousParAgenda",
              },
              {
                question: "Etre appelé par l'établissement pour obtenir des informations",
                tagName: "tmsPriseDeRendezVousParTelephone",
              },
            ]}
            modalTitleAfterSelection={
              <>
                <img src={thumbUpIcon} alt="thumb up icon" />
                <span>
                  <strong>Merci !</strong> Votre clic nous est utile et nous permet d'améliorer notre service.
                </span>
              </>
            }
            modalTextAfterSelection={
              <>
                <span>
                  <strong>Psst, n'oubliez pas de contacter l'établissement !</strong>
                </span>
                <br />
                <br />
                {training.contact && training.contact.email && (
                  <div className={"cfaEmail"}>
                    <span>
                      <strong>Envoyer un email :</strong>
                    </span>
                    <br />
                    <span>{training.contact.email}</span>
                  </div>
                )}
              </>
            }
          />
        }
      </div>
    </>
  );
};

export default TrainingDetail;
