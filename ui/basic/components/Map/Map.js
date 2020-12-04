import React, { useEffect, useRef } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../../store/actions";

import { map, initializeMap } from "../../utils/mapTools";

const Map = ({ showResultList }) => {
  const store = useStore();
  const { trainings, jobs } = useSelector((state) => state.trainings);
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const unselectItem = () => {
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    if (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length)) {
      initializeMap({ mapContainer, store, showResultList, unselectItem, trainings, jobs });
    }
  });

  return <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />;
};

export default Map;
