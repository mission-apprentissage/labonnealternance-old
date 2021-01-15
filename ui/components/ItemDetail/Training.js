import React from "react";
import trainingIcon from "../../public/images/icons/school.svg";
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

  //console.log("training : ",training);

  return (
    <div className="resultCard trainingCard">
      <div id={`id${training.id}`}>
        <img className="cardIcon" src={trainingIcon} alt="" />
        <span className="cardDistance">{Math.round(training.place.distance)} km(s) du lieu de recherche</span>
      </div>
      <div className="title">{training.title ? training.title : training.longTitle}</div>
      <div className="body">
        {training.company.name}
        <div className="companyAddress">{training.place.fullAddress}</div>
      </div>
      {showTextOnly ? (
        ""
      ) : (
        <>
          {Math.round(training.place.distance) > currentSearchRadius && scopeContext.isJob
            ? getCenterSearchOnTrainingButton()
            : ""}
          <div className="knowMore">
            <button className={`gtmSavoirPlus gtmFormation gtmListe`} onClick={onSelectItem}>
              En savoir plus
            </button>
          </div>
          <div style={{ clear: "both" }} />
        </>
      )}
    </div>
  );
};

export default Training;
