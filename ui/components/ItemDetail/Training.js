import React, { useState } from "react";
import trainingIcon from "../../public/images/icons/book.svg";
import { useSelector } from "react-redux";
import { fetchAddresses } from "../../services/baseAdresse";
import extendedSearchPin from "../../public/images/icons/jobPin.svg";
import { useScopeContext } from "../../context/ScopeContext";
import { isCfaEntreprise } from "../../services/cfaEntreprise";
import TagCfaDEntreprise from "./TagCfaDEntreprise";
import { setSelectedMarker } from "../../utils/mapTools";

const Training = ({ training, handleSelectItem, showTextOnly, searchForJobsOnNewCenter }) => {
  const { formValues, itemParameters, selectedMapPopupItem } = useSelector((state) => state.trainings);
  const scopeContext = useScopeContext();

  const currentSearchRadius = formValues?.radius || 30;

  const [allowDim, setAllowDim] = useState(true); // cet état évite un appel qui masque la mise en avant de l'icône lors de l'ouverture du détail

  const onSelectItem = () => {
    setAllowDim(false); // fixation du flag
    handleSelectItem(training, "training");
  };

  const getHightlightClass = () => {
    return shouldBeHighlighted() ? "c-resultcard--highlight" : "";
  };

  const shouldBeHighlighted = () => {
    if (selectedMapPopupItem?.ideaType === "formation") {
      return selectedMapPopupItem.items.find((item) => {
        return item.id === training.id;
      });
    } else {
      return false;
    }
  };

  const getCenterSearchOnTrainingButton = () => {
    return (
      <button className="extendedJobSearchButton" onClick={centerSearchOnTraining}>
        <img src={extendedSearchPin} alt="" /> <span>Voir les entreprises proches</span>
      </button>
    );
  };

  const getDebugClass = () => {
    if (itemParameters?.mode === "debug" && formValues?.job?.rncps.indexOf(training.rncpCode) < 0) {
      return "debugRemoved";
    } else {
      return "";
    }
  };

  const centerSearchOnTraining = async (e) => {
    if (e) {
      e.stopPropagation();
    }

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

  const highlightItemOnMap = () => {
    setSelectedMarker(training);
  };

  const dimItemOnMap = (e) => {
    if (allowDim) {
      setSelectedMarker(null);
    } else {
      setAllowDim(true);
    }
  };

  return (
    <a
      className={`resultCard trainingCard gtmSavoirPlus gtmFormation gtmListe ${getHightlightClass()} ${getDebugClass()}`}
      onClick={onSelectItem}
      onMouseOver={highlightItemOnMap}
      onMouseOut={dimItemOnMap}
      href="#"
    >
      <div className="c-media" id={`id${training.id}`}>
        <div className="c-media-figure">
          <img className="cardIcon" src={trainingIcon} alt="" />
        </div>

        <div className="c-media-body">
          <div className="row no-gutters">
            <div className="col-12 col-lg-6 text-left">
              <div className="title d-inline-block">{training.title ? training.title : training.longTitle}</div>
            </div>
            <div className="col-12 col-lg-6  d-lg-flex flex-column text-left text-lg-right my-1 my-lg-0">
              <TagCfaDEntreprise isCfa={isCfaEntreprise(training?.company?.siret)} />
            </div>
          </div>

          <div className="cardText pt-3 pt-lg-1">{training.company.name}</div>
          <div className="cardText pt-2">{training.place.fullAddress}</div>
          {itemParameters?.mode === "debug" ? (
            <div className="cardText pt-2">{`${training.rncpCode} - romes :${training.romes.map(
              (rome) => " " + rome.code
            )}`}</div>
          ) : (
            ""
          )}
          <span className="cardDistance pt-1">
            {Math.round(training.place.distance)} km(s) du lieu de recherche
            {showTextOnly ? (
              ""
            ) : (
              <>
                <span className="knowMore d-none d-md-block">
                  <button className="c-resultcard-knowmore">En savoir plus</button>
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
    </a>
  );
};

export default Training;
