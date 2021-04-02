import React from "react";
import jobIcon from "../../public/images/icons/job.svg";
import briefcaseIcon from "../../public/images/briefcase.svg";
import { useSelector } from "react-redux";
import extendedSearchPin from "../../public/images/icons/trainingPin.svg";
import ReactHtmlParser from "react-html-parser";

const PeJob = ({ job, handleSelectItem, showTextOnly, searchForTrainingsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);

  const currentSearchRadius = formValues?.radius || 30;

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

  const centerSearchOnPeJob = (e) => {
    if (e) {
      e.stopPropagation();
    }

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
    <div className="resultCard gtmSavoirPlus gtmPeJob gtmListe" onClick={onSelectItem}>
      <div className="c-media" id={`${job.ideaType}${job.job.id}`}>
        <div className="c-media-figure">
          <img className="cardIcon" src={jobIcon} alt="" />
        </div>

        <div className="c-media-body">
          <div className="row no-gutters">
            <div className="col-8 text-left">
              <div className="title d-inline-block">
                {job.company && job.company.name ? job.company.name : ReactHtmlParser("<i>Offre anonyme</i>")}
              </div>
              <div className="cardText pt-0">{job.title}</div>
              <div className="cardText pt-2">{job.place.fullAddress}</div>
              <span className="cardDistance pt-1">
                {Math.round(job.place.distance)} km(s) du lieu de recherche
              </span>
            </div>
            <div className="col-4 d-flex flex-column">

              <span className="c-media-tag c-media-tag--briefcase">
                <img src={briefcaseIcon} alt="valise" />
                <span className="ml-1">Offre d'emploi</span>
              </span>

              {showTextOnly ? (
                  ""
                ) : (
                  <>
                    <span className="knowMore d-none d-md-block mt-auto">
                      <button className={`c-resultcard-knowmore`}>En savoir plus</button>
                    </span>
                  </>
                )}
            </div>
          </div>

          {Math.round(job.place.distance) > currentSearchRadius ? getCenterSearchOnPeJobButton() : ""}
        </div>
      </div>
    </div>
  );
};

export default PeJob;
