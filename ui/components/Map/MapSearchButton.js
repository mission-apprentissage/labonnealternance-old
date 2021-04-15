import React from "react";
import { useSelector } from "react-redux";
import refreshSearchOnMap from "public/images/icons/refreshSearchOnMap.svg";

const MapSearchButton = ({ handleSearchClick }) => {
  const { hasSearch, formValues } = useSelector((state) => state.trainings);

  return hasSearch ? (
    <div className="c-map-searchButton">
      <button
        onClick={handleSearchClick}
        title="Lancer une rechercher centrée sur la carte"
        className="d-flex align-items-center"
      >
        {formValues ? (
          <>
            <img src={refreshSearchOnMap} />
            <span className="ml-2">Rechercher dans cette zone</span>
          </>
        ) : (
          <>
            <img src={refreshSearchOnMap} />
            <span className="ml-2">Rechercher des entreprises</span>
          </>
        )}
      </button>
    </div>
  ) : (
    ""
  );
};

export default MapSearchButton;
