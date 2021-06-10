import React, { useEffect } from "react";
import { setSelectedMapPopupItem, setSelectedItem } from "store/actions";
import { useDispatch } from "react-redux";
import { getJobAddress } from "utils/jobs";
import { logError } from "utils/tools";
import { ErrorMessage } from "../..";
import { capitalizeFirstLetter } from "utils/strutils";
import { setSelectedMarker } from "utils/mapTools";
import bookIcon from "public/images/icons/book.svg";
import jobIcon from "public/images/icons/job.svg";

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

  const truncateWithEllipses = function(text, max) { return text.substr(0, max - 1) + (text.length > max ? '...' : ''); }

  const getContent = () => {
    try {
      const list = item.items;
      console.log('list', list);

      if (type === "job") {
        return (
          <div className="c-mapbox-container">
            <div className="ml-3 my-3">
              <img className="cardIcon mr-2" src={jobIcon} alt="" />
              <span className="mapboxPopupTitle">Opportunité<span className={`${list.length > 1 ? '' : 'd-none'}`}>s</span> d'emploi : </span>
            </div>
            <div className="c-mapbox-address ml-3 my-2 mb-3">
              {getJobAddress(list[0])}
            </div>
            <div className="c-mapbox-bg">
              <div className="ml-3">
                <ul className="c-mapbox-list">
                  {list.map((job, idx) => (
                    <li className={`c-mapbox-list-item ${idx === list.length - 1 ? 'is-last' : ''} ${idx === 0 ? 'is-first' : ''}`} key={idx}>
                      <button
                        className={`c-mapboxpopup--link gtmSavoirPlus gtm${capitalizeFirstLetter(job.ideaType)} gtmMap`}
                        onClick={() => openItemDetail(job)}
                      >
                        {truncateWithEllipses(job.title, 25)}
                      </button>
                      {job.ideaType === "peJob" && job?.company?.name ? (
                        <span className='c-mapbox-companyname'>
                          - {job.company.name}
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mapboxPopupFormation">
            <div className="ml-3 my-3">
              <img className="cardIcon mr-2" src={bookIcon} alt="" />
              <span className="mapboxPopupTitle">Formations : </span>
            </div>
            <div className="mapboxPopupPlace ml-3 my-2">{list[0].company.name}</div>
            <div className="mapboxPopupAddress ml-3 my-2 mb-3">
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
