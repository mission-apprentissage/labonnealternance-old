import React from "react";
import trainingIcon from "../../public/images/icons/book.svg";
import { useSelector } from "react-redux";
import { fetchAddresses } from "../../services/baseAdresse";
import extendedSearchPin from "../../public/images/icons/jobPin.svg";
import { useScopeContext } from "context/ScopeContext";

const Training = ({ training, handleSelectItem, showTextOnly, searchForJobsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);
  const scopeContext = useScopeContext();

  const currentSearchRadius = formValues.radius || 30;

  const onSelectItem = () => {
    handleSelectItem(training, "training");
  };

  const getCenterSearchOnTrainingButton = () => {
    return (
      <button className="extendedJobSearchButton" onClick={centerSearchOnTraining}>
        <img src={extendedSearchPin} alt="" /> <span>Voir les entreprises proches</span>
      </button>
    );
  };

  const centerSearchOnTraining = async () => {
    // reconstruction des critères d'adresse selon l'adresse du centre de formation
    const label = `${training.place.city} ${training.place.zipCode}`;

    // récupération du code insee depuis la base d'adresse
    if (!training.place.insee) {
      const addresses = await fetchAddresses(label, "municipality");
      if (addresses.length) {
        training.place.insee = addresses[0].insee;
      }
    }

    const newCenter = {
      insee: training.place.insee,
      label,
      zipcode: training.place.zipCode,
      value: {
        type: "Point",
        coordinates: [training.place.longitude, training.place.latitude],
      },
    };

    searchForJobsOnNewCenter(newCenter);
  };

  console.log("training company : ",training.company);

  return (
    <div className="resultCard trainingCard">

      <div className="c-media" id={`id${training.id}`}>

        <div className="c-media-figure">
          <img className="cardIcon" src={trainingIcon} alt="" />
        </div>

        <div className="c-media-body">
          <div className="title d-inline-block">{training.title ? training.title : training.longTitle}</div>
          <div className="cardText text-capitalize pt-1">{training.company.name.toLowerCase()}</div>
          <div className="cardText text-capitalize pt-2">{training.place.fullAddress.toLowerCase()}</div>
          <span className="cardDistance pt-1">
            {Math.round(training.place.distance)} km(s) du lieu de recherche

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
          {showTextOnly ? (
            ""
          ) : (
            <>
              {Math.round(training.place.distance) > currentSearchRadius && scopeContext.isJob
                ? getCenterSearchOnTrainingButton()
                : ""}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Training;
