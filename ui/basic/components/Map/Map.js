import React, { useEffect, useRef } from "react";
import { useStore, useDispatch } from "react-redux";
import { setSelectedItem } from "../../store/actions";

import { map, initializeMap } from "../../utils/mapTools";

const Map = ({ showResultList }) => {
  const store = useStore();
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const unselectItem = () => {
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {

    console.log("map : ",map);

    if (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length )) 
    {
      initializeMap({ mapContainer, store, showResultList, unselectItem });
    };});

  return <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />;
};

export default Map;
