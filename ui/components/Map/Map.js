import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { currentPage, setCurrentPage, currentSearch } from "utils/currentPage.js";
import { ScopeContext } from "context/ScopeContext";
import pushHistory from "utils/pushHistory";
import MapSearchButton from "./MapSearchButton";
import { map, initializeMap, isMapInitialized, setSelectedMarker } from "utils/mapTools";
import { fetchAddressFromCoordinates } from "../../services/baseAdresse";
import { SearchResultContext } from "../../context/SearchResultContextProvider";
import { DisplayContext } from "../../context/DisplayContextProvider";

let mapPosition = {
  lat: null,
  lon: null,
  zoom: null,
};

let shouldHandleMapSearch = true;

const Map = ({ handleSearchSubmit, showSearchForm, selectItemOnMap }) => {
  const { formValues, shouldMapBeVisible } = useContext(DisplayContext);

  const { trainings, jobs, setSelectedItem, setSelectedMapPopupItem } = useContext(SearchResultContext);

  const router = useRouter();

  const scopeContext = useContext(ScopeContext);

  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainer = useRef(null);

  const unselectItem = () => {
    setSelectedItem(null);
    setSelectedMarker(null);
    if (currentPage === "fiche") {
      setCurrentPage("");
      pushHistory({ router, scopeContext, searchParameters: formValues, searchTimestamp: currentSearch });
    }
  };

  const unselectMapPopupItem = () => {
    setSelectedMapPopupItem(null);
  };

  const handleSearchClick = async () => {
    if (formValues) {
      if (shouldHandleMapSearch) {
        shouldHandleMapSearch = false;

        let values = formValues;
        if (!values?.location?.value) {
          values.location = {
            value: {
              type: "Point",
            },
          };
        }

        if (mapPosition.lon && mapPosition.lat) {
          values.location.value.coordinates = [mapPosition.lon, mapPosition.lat];

          try {
            // récupération du code insee depuis la base d'adresse
            const addresses = await fetchAddressFromCoordinates([mapPosition.lon, mapPosition.lat]);

            if (addresses.length) {
              values.location.insee = addresses[0].insee;
              values.location.zipcode = addresses[0].zipcode;
              values.location.label = addresses[0].label;
            } else {
              values.location.insee = null;
              values.location.label = null;
              values.location.zipcode = null;
            }
          } catch (err) {}
          await handleSearchSubmit({ values });
        }

        shouldHandleMapSearch = true;
      }
    } else {
      // le formulaire n'a pas été renseigné. On ne connait pas le métier
      showSearchForm();
    }
  };

  const onMapHasMoved = ({ lat, lon, zoom }) => {
    mapPosition = {
      lat,
      lon,
      zoom,
    };
  };

  const shouldMapBeInitialized = () => {
    /*
    Chargement de la carte si :
    - elle n'est pas chargée
    - il y a des résultats 
    - le panneau carte est visible à l'écran
     */

    const vw = document.documentElement.clientWidth;

    return (
      !isMapInitialized &&
      (trainings.length > 0 || jobs.peJobs || jobs.lbaCompanies || jobs.lbbCompanies || jobs.matchas) &&
      (shouldMapBeVisible || vw > 767) &&
      (!map || (map && !document.getElementsByClassName("mapContainer")[0].innerHTML.length))
    );
  };

  useEffect(() => {
    if (shouldMapBeInitialized()) {
      setMapInitialized(true);
      initializeMap({
        mapContainer,
        unselectItem,
        trainings,
        jobs,
        selectItemOnMap,
        onMapHasMoved,
        unselectMapPopupItem,
        setSelectedItem,
        setSelectedMapPopupItem,
      });
    }
  }, [trainings, jobs, shouldMapBeVisible]);

  useEffect(() => {
    //hack pour recharger la map après navigation back / forward navigateur
    if (!mapInitialized && isMapInitialized) {
      setMapInitialized(true);
      setTimeout(() => {
        initializeMap({
          mapContainer,
          unselectItem,
          trainings,
          jobs,
          selectItemOnMap,
          onMapHasMoved,
          unselectMapPopupItem,
          setSelectedItem,
          setSelectedMapPopupItem,
        });
      }, 0);
    }
  }, []);

  // Warning : mapContainer doit être vide sinon les onclick sur la map ne marcheront pas
  return (
    <>
      <MapSearchButton handleSearchClick={handleSearchClick} />
      <div ref={(el) => (mapContainer.current = el)} className={`mapContainer ${mapInitialized ? "" : "d-none"}`}></div>
      <div className={`dummyMapContainer ${mapInitialized ? "d-none" : ""}`}>
        <div className="c-staticmapframe"></div>
      </div>
    </>
  );
};

export default Map;
