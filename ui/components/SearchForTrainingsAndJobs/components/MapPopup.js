import React from "react";
import { setSelectedItem } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { getJobAddress } from "../../../utils/jobs";
import { logError } from "../../../utils/tools";
import { ErrorMessage } from "../../";
import { capitalizeFirstLetter } from "../../../utils/strutils";
import { setSelectedMarker } from "utils/mapTools";

const MapPopup = ({ type, item, handleSelectItem }) => {
  //console.log("Mappopup : ", type, item);
  const dispatch = useDispatch();

  const openItemDetail = (item) => {
    dispatch(setSelectedItem(item));
    setSelectedMarker(item);
    handleSelectItem(item);
  };

  const getContent = () => {
    try {
      const list = item.items;

      if (type === "job") {
        if (list.length > 1) {
          return getJobs(list);
        } else {
          const job = list[0];
          return (
            <>
              <div className="mapboxPopupTitle">{job.title}</div>
              <div className="mapboxPopupAddress">{getJobAddress(job)}</div>
              <div className="knowMore">
                <button
                  className={`gtmSavoirPlus gtm${capitalizeFirstLetter(job.ideaType)} gtmMap`}
                  onClick={() => openItemDetail(job)}
                >
                  En savoir plus
                </button>
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div className="mapboxPopupTitle">Formations à : </div>
            <div className="mapboxPopupAddress">
              {list[0].company.name}
              <br />
              {list[0].place.fullAddress}
            </div>
            <ul>{getTrainings(list)}</ul>
          </>
        );
      }
    } catch (err) {
      logError(`Popup error ${type}`, err);
      console.log("Erreur de format des éléments emplois : ", type, item);
      return (
        <ErrorMessage
          message={
            <div className="popupError">
              Le format de l'élément sélectionné est erroné.
              <br />
              <br />
              Veuillez accepter nos excuses.
              <br />
              L'équipe Labonnealternance.
            </div>
          }
        />
      );
    }
  };

  const getJobs = (list) => {
    let result = (
      <>
        <div className="mapboxPopupTitle">Opportunités d'emploi : </div>
        <div className="mapboxPopupAddress">{getJobAddress(list[0])}</div>

        <ul>
          {list.map((job, idx) => (
            <li key={idx}>
              <button
                className={`c-mapboxpopup--link gtmSavoirPlus gtm${capitalizeFirstLetter(job.ideaType)} gtmMap`}
                onClick={() => openItemDetail(job)}
              >
                {job.title}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
    return result;
  };

  const getTrainings = (list) => {
    let result = (
      <>
        {list.map((training, idx) => (
          <li key={idx}>
            <button
              className={`c-mapboxpopup--link gtmSavoirPlus gtmFormation gtmMap`}
              onClick={() => openItemDetail(training)}
            >
              {training.title ? training.title : training.longTitle}
            </button>
          </li>
        ))}
      </>
    );
    return result;
  };

  return getContent();
};

export default MapPopup;
