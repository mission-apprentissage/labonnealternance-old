import React from "react";
import { useSelector } from "react-redux";
import refreshSearchOnMap from "public/images/icons/refreshSearchOnMap.svg";

const MapSearchButton = ({ handleSearchClick }) => {
  const { hasSearch } = useSelector((state) => state.trainings);

  return hasSearch ? (
    <div className="c-map-searchButton">
      <button
        onClick={handleSearchClick}
        title="Lancer une rechercher centrée sur la carte"
        className="d-flex align-items-center"
      >
        <img src={refreshSearchOnMap} />
        <span className="ml-2">Rechercher dans cette zone</span>
      </button>
    </div>
  ) : (
    ""
  );
};

export default MapSearchButton;
