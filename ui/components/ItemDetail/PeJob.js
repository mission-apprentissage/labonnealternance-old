import React from "react";
import jobIcon from "../../public/images/icons/job.svg";
import companySizeIcon from "../../public/images/icons/employees.svg";
import { useSelector } from "react-redux";
import extendedSearchPin from "../../public/images/icons/trainingPin.svg";
import { get } from "lodash";
import ReactHtmlParser from 'react-html-parser'; 

const PeJob = ({ job, handleSelectItem, showTextOnly, searchForTrainingsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);

  const currentSearchRadius = formValues.radius || 30;

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
      <div className="c-media" id={`id${job.job.id}`}>
      
        <div className="c-media-figure">
          <img className="cardIcon" src={jobIcon} alt="" />
        </div>

        <div className="c-media-body">
          <div className="title d-inline-block">{job.company && job.company.name ? job.company.name : ReactHtmlParser("<i>Entreprise</i>")}</div>
          <div className="cardText pt-0">{job.title}</div>
          <div className="cardText pt-2">{job.place.fullAddress.toLowerCase()}</div>

          <span className="cardDistance pt-1">
              {Math.round(job.place.distance)} km(s) du lieu de recherche

              {showTextOnly ? (
                ""
              ) : (
                <>
                  <span className="knowMore">
                    <button className="c-resultcard-knowmore" onClick={onSelectItem}>
                      En savoir plus
                    </button>
                  </span>
                </>
              )}
            </span> 
            {Math.round(job.place.distance) > currentSearchRadius ? getCenterSearchOnPeJobButton() : ""}
        </div>
        
      </div>
    </div>
  );
};

export default PeJob;
