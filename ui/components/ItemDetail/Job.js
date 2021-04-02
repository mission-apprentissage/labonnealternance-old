import React from "react";
import jobIcon from "../../public/images/icons/job.svg";
import briefcaseIcon from "../../public/images/briefcase.svg";
import { useSelector } from "react-redux";
import extendedSearchPin from "../../public/images/icons/trainingPin.svg";
import { fetchAddresses } from "../../services/baseAdresse";
import ReactHtmlParser from "react-html-parser";

const Job = ({ job, handleSelectItem, showTextOnly, searchForTrainingsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);

  const currentSearchRadius = formValues?.radius || 30;

  const onSelectItem = () => {
    handleSelectItem(job, "peJob");
  };

  const getCenterSearchOnPeJobButton = () => {
    return (
      <button className="extendedTrainingSearchButton" onClick={centerSearchOnJob}>
        <img src={extendedSearchPin} alt="" /> <span>Voir les formations proches</span>
      </button>
    );
  };

  const centerSearchOnJob = async (e) => {
    if (e) {
      e.stopPropagation();
    }

    let jobPlace = job.place;

    if (!jobPlace.insee) {
      const addresses = await fetchAddresses(job.place.address, "municipality");
      jobPlace.insee = "";
      jobPlace.zipCode = "";
      if (addresses.length) {
        jobPlace.insee = addresses[0].insee;
        jobPlace.zipCode = addresses[0].zipcode;
      }
    }

    const newCenter = {
      insee: jobPlace.insee,
      label: jobPlace.fullAddress,
      zipcode: jobPlace.zipCode,
      value: {
        type: "Point",
        coordinates: [jobPlace.longitude, jobPlace.latitude],
      },
    };

    searchForTrainingsOnNewCenter(newCenter);
  };

  return (
    <div className="resultCard gtmSavoirPlus gtmPeJob gtmListe" onClick={onSelectItem}>
      <div className="c-media" id={`${job.ideaType}${job.ideaType === "matcha" ? job.id : job.job.id}`}>
        <div className="c-media-figure">
          <img className="cardIcon" src={jobIcon} alt="" />
        </div>

        <div className="c-media-body">
          <div className="row">
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

              <div className="c-media-tag c-media-tag--briefcase">
                <img src={briefcaseIcon} alt="valise" />
                <span className="ml-1">Offre d'emploi</span>
              </div>

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

          <span className="cardDistance pt-1">
            {job.place.distance} km(s) du lieu de recherche
            {showTextOnly ? (
              ""
            ) : (
              <>
                <span className="knowMore d-none d-md-block">
                  <button className={`c-resultcard-knowmore`}>En savoir plus</button>
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

export default Job;
