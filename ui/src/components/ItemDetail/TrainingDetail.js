import React, { useEffect } from "react";
import infoIcon from "../../assets/icons/info.svg";

const TrainingDetail = ({ training }) => {
  //console.log("training : ", training);

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
      </div>
    </>
  );
};

export default TrainingDetail;
