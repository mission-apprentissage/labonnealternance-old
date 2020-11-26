import React from "react";
import jobIcon from "../../public/static/icons/job.svg";
import companySizeIcon from "../../public/static/icons/employees.svg";
import { useSelector } from "react-redux";
import extendedSearchPin from "../../public/static/icons/trainingPin.svg";
import { get } from "lodash";

const PeJob = ({ job, handleSelectItem, showTextOnly, searchForTrainingsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);

  const onSelectItem = () => {
    handleSelectItem(job, "peJob");
  };

  const getCenterSearchOnPeJobButton = () => {
    return (
      <button className="extendedTrainingSearchButton" onClick={centerSearchOnPeJob}>
        <img src={extendedSearchPin} alt="" /> <span>Voir les formations proches</span>
      </button>
    );
  };

  const centerSearchOnPeJob = () => {
    let lT = job.place;

    const newCenter = {
      insee: lT.insee,
      label: lT.fullAddress,
      zipcode: lT.zipCode,
      value: {
        type: "Point",
        coordinates: [lT.longitude, lT.latitude],
      },
    };

    searchForTrainingsOnNewCenter(newCenter);
  };

  return (
    <div className="resultCard">
      <div id={`peJob${job.job.id}`}>
        <img className="cardIcon" src={jobIcon} alt="" />
        <span className="cardDistance">{job.place.distance} km(s) du lieu de recherche</span>
      </div>

      <div className="title">{job.company ? job.company.name : ""}</div>
      <div className="body">
        {job.title}
        <div className="companyAddress">{job.place.fullAddress}</div>
        {get(job.company.size) ? (
          <div className="companySize">
            <img src={companySizeIcon} alt="" />
            {job.company.size === "0 salarié" ? "petite entreprise" : job.company.size}
          </div>
        ) : (
          ""
        )}

        <div className="hasJob">L'entreprise propose 1 offre d'emploi pour cette formation</div>
      </div>

      {showTextOnly ? (
        ""
      ) : (
        <>
          {Math.round(job.place.distance) > formValues.radius ? getCenterSearchOnPeJobButton() : ""}
          <div className="knowMore">
            <button className={`gtmSavoirPlus gtmPeJob gtmListe`} onClick={onSelectItem}>
              En savoir plus
            </button>
          </div>
          <div style={{ clear: "both" }} />
        </>
      )}
    </div>
  );
};

export default PeJob;
