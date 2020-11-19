import React from "react";
import { setSelectedItem } from "../../../redux/Training/actions";
import { useDispatch } from "react-redux";
//import { getTrainingSchoolName, getTrainingAddress } from "../../../utils/formations";
import { getJobAddress } from "../../../utils/jobs";
import { logError } from "../../../utils/tools";
import { ErrorMessage } from "../../../components";

const MapPopup = ({ type, item, handleSelectItem }) => {
  //console.log("Mappopup : ", type, item);
  const dispatch = useDispatch();

  const openJobDetail = (job) => {
    dispatch(setSelectedItem(job));
    handleSelectItem();
  };

  const openTrainingDetail = (training) => {
    dispatch(setSelectedItem(training));
    handleSelectItem();
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
                <button className={`gtmSavoirPlus gtm${job.ideaType} gtmMap`} onClick={() => openJobDetail(job)}>
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
              {list[0].company.name.toLowerCase() /*getTrainingSchoolName(list[0].source, "lowerCase")*/}
              <br />
              {list[0].place.fullAddress.toLowerCase() /*getTrainingAddress(list[0].source, "lowerCase")*/}
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
            <li onClick={() => openJobDetail(job)} key={idx}>
              {job.title}
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
          <li className={`gtmSavoirPlus gtmFormation gtmMap`} onClick={() => openTrainingDetail(training)} key={idx}>
            {training.title ? training.title : training.longTitle}
          </li>
        ))}
      </>
    );
    return result;
  };

  return getContent();
};

export default MapPopup;
