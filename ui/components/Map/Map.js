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
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    if (
      !isMapInitialized &&
      (jobs.length > 0 || trainings.length > 0) &&
      (shouldMapBeVisible || vw > 760) &&
      (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length))
    ) {
      console.log("initialize map Map.js");
      initializeMap({ mapContainer, store, showResultList, unselectItem, trainings, jobs });
    } else {
      console.log("pas init", isMapInitialized, shouldMapBeVisible);
    }
  }, [trainings, jobs]);

  return (
    <div ref={(el) => (mapContainer.current = el)} className="mapContainer">
      <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" />
    </div>
  );
};

export default Map;
