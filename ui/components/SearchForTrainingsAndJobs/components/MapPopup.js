import React, { useEffect } from "react";
import { setSelectedMapPopupItem, setSelectedItem } from "store/actions";
import { useDispatch } from "react-redux";
import { getJobAddress } from "utils/jobs";
import { logError } from "utils/tools";
import { ErrorMessage } from "../..";
import { capitalizeFirstLetter } from "utils/strutils";
import { setSelectedMarker } from "utils/mapTools";
import bookIcon from "public/images/icons/book.svg";

const MapPopup = ({ type, item, handleSelectItem }) => {
  const dispatch = useDispatch();

  const openItemDetail = (item) => {
    dispatch(setSelectedItem(item));
    setSelectedMarker(item);
    handleSelectItem(item);
  };

  useEffect(() => {
    dispatch(setSelectedMapPopupItem(item));
  }, []);

  const getContent = () => {
    try {
      const list = item.items;
      console.log('list', list);

      if (type === "job") {
        if (list.length > 1) {
          return getJobs(list);
        } else {
          const job = list[0];
          return (
            <div className="mapboxPopupJob">
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
            </div>
          );
        }
      } else {
        return (
          <div className="mapboxPopupFormation">
            <div className="ml-3 my-3">
              <img className="cardIcon mr-1" src={bookIcon} alt="" />
              <span className="mapboxPopupTitle">Formations : </span>
            </div>
            <div className="mapboxPopupPlace ml-3 my-2">{list[0].company.name}</div>
            <div className="mapboxPopupAddress ml-3 my-2">
              {list[0].place.fullAddress}
            </div>
            <div className="mapboxPopupBg">
              <div className="">
                <div className="ml-2">
                  <ul className="mapboxPopupDescr">{getTrainings(list)}</ul>
                </div>
              </div>
            </div>
          </div>
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
          <li key={idx} className="c-mapboxpopup-li">
            <span>
              <button
                className={`c-mapboxpopup--link gtmSavoirPlus gtmFormation gtmMap`}
                onClick={() => openItemDetail(training)}
                >
                {training.title ? training.title : training.longTitle}
              </button>
            </span>
          </li>
        ))}
      </>
    );
    return result;
  };

  return getContent();
};

export default MapPopup;
