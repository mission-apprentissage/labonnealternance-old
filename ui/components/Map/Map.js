import React, { useState, useEffect, useRef } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../../store/actions";

import { map, initializeMap, isMapInitialized } from "../../utils/mapTools";

const Map = ({ showResultList }) => {
  const store = useStore();
  const { trainings, jobs, shouldMapBeVisible } = useSelector((state) => {
    return state.trainings;
  });

  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const unselectItem = () => {
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    const vw = document.documentElement.clientWidth;

    if (
      !isMapInitialized &&
      (trainings.length > 0 || jobs.peJobs || jobs.lbaCompanies || jobs.lbbCompanies) &&
      (shouldMapBeVisible || vw > 767) &&
      (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length))
    ) {
      setMapInitialized(true);
      initializeMap({ mapContainer, store, showResultList, unselectItem, trainings, jobs });
    }
  }, [trainings, jobs]);

  // Warning : mapContainer doit être vide sinon les onclick sur la map ne marcheront pas
  return (
    <>
      <div ref={(el) => (mapContainer.current = el)} className={`mapContainer ${mapInitialized ? "" : "d-none"}`}></div>
      <div className={`dummyMapContainer ${mapInitialized ? "d-none" : ""}`}>
        <div className="c-staticmapframe pr-5 py-3">
          <table>
            <tr>
              <td className="px-5 c-staticmapframe__decoration"></td>
              <td>
                <span className="c-staticmapframe__title">Faites une recherche</span>
                <br />
                Renseignez les champs de recherche à droite pour trouver la formation et l'entreprise pour réaliser
                votre projet d'alternance
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Map;
