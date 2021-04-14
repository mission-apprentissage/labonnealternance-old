import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useStore, useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "store/actions";
import { currentPage, setCurrentPage } from "utils/currentPage.js";
import { useScopeContext } from "context/ScopeContext";
import pushHistory from "utils/pushHistory";
import MapSearchButton from "./MapSearchButton";
import { map, initializeMap, isMapInitialized } from "utils/mapTools";

const Map = ({ selectItemOnMap }) => {
  const store = useStore();
  const { trainings, jobs, shouldMapBeVisible } = useSelector((state) => {
    return state.trainings;
  });
  const router = useRouter();

  const scopeContext = useScopeContext();

  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainer = useRef(null);
  const dispatch = useDispatch();

  const unselectItem = () => {
    dispatch(setSelectedItem(null));
    if (currentPage === "fiche") {
      setCurrentPage("");
      pushHistory({ router, scopeContext });
    }
  };

  const handleSearchClick = () => {
    console.log("aaa");
  }

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
      initializeMap({ mapContainer, store, unselectItem, trainings, jobs, selectItemOnMap });
    }
  }, [trainings, jobs]);

  useEffect(() => {
    //hack pour recharger la map après navigation back / forward navigateur
    if (!mapInitialized && isMapInitialized) {
      setMapInitialized(true);
      setTimeout(() => {
        initializeMap({ mapContainer, store, unselectItem, trainings, jobs, selectItemOnMap });
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
