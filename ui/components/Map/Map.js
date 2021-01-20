import React, { useEffect, useRef } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../../store/actions";

import { map, initializeMap, isMapInitialized } from "../../utils/mapTools";

const Map = ({ showResultList }) => {
  const store = useStore();
  const { trainings, jobs, shouldMapBeVisible } = useSelector((state) => {
    return state.trainings;
  });
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const unselectItem = () => {
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    const vw = document.documentElement.clientWidth;

    if (
      !isMapInitialized &&
      (jobs.length > 0 || trainings.length > 0) &&
      (shouldMapBeVisible || vw > 767) &&
      (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length))
    ) {
      console.log("INITIALISATION MAP");
      initializeMap({ mapContainer, store, showResultList, unselectItem, trainings, jobs });
    }
  }, [trainings, jobs]);

  // Warning : mapContainer doit être vide sinon les onclick sur la map ne marcheront pas
  return <div ref={(el) => (mapContainer.current = el)} className="mapContainer"></div>;
};

export default Map;
