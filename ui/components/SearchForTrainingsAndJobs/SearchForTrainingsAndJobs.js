/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { loadItem } from "components/SearchForTrainingsAndJobs/services/loadItem";
import { searchForTrainingsFunction } from "components/SearchForTrainingsAndJobs/services/searchForTrainings";
import { searchForJobsFunction } from "components/SearchForTrainingsAndJobs/services/searchForJobs";
import { useDispatch, useSelector } from "react-redux";
import pushHistory from "utils/pushHistory";
import {
  setSelectedItem,
  setItemToScrollTo,
  setIsFormVisible,
  setVisiblePane,
  setShouldMapBeVisible,
  setTrainings,
  setJobs,
  setFormValues,
  setExtendedSearch,
  setHasSearch,
} from "store/actions";

import {
  flyToMarker,
  flyToLocation,
  closeMapPopups,
  factorTrainingsForMap,
  factorJobsForMap,
  computeMissingPositionAndDistance,
  setJobMarkers,
  setTrainingMarkers,
  setSelectedMarker,
  resizeMap,
  isMapInitialized,
} from "utils/mapTools";

import { useScopeContext } from "context/ScopeContext";

import Map from "components/Map";
import { Row, Col } from "reactstrap";
import { MapListSwitchButton, ChoiceColumn } from "./components";
import { WidgetHeader, InitWidgetSearchParameters } from "components/WidgetHeader";
import { currentPage, setCurrentPage } from "utils/currentPage";
import updateUiFromHistory from "services/updateUiFromHistory";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();
  const scopeContext = useScopeContext();

  const { trainings, jobs, hasSearch, selectedItem, widgetParameters, visiblePane, isFormVisible, formValues } = useSelector(
    (state) => state.trainings
  );

  const [searchRadius, setSearchRadius] = useState(30);
  const [isTrainingSearchLoading, setIsTrainingSearchLoading] = useState(hasSearch ? false : true);
  const [shouldShowWelcomeMessage, setShouldShowWelcomeMessage] = useState(hasSearch ? false : true);

  const [isJobSearchLoading, setIsJobSearchLoading] = useState(hasSearch ? false : true);
  const [jobSearchError, setJobSearchError] = useState("");
  const [allJobSearchError, setAllJobSearchError] = useState(false);
  const [trainingSearchError, setTrainingSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(hasSearch ? false : true);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      //console.log("route change from routing ", url);

      updateUiFromHistory({
        url,
        currentPage,
        trainings,
        jobs,
        selectedItem,
        unSelectItem,
        selectItemFromHistory,
        setCurrentPage,
        visiblePane,
        isFormVisible,
        showResultMap,
        showResultList,
        showSearchForm,
      });
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [trainings, jobs]);

  const selectItemFromHistory = (itemId, type) => {
    const item = findItem(itemId, type);

    closeMapPopups();
    if (item) {
      flyToMarker(item, 12);
      dispatch(setSelectedItem(item));
      setSelectedMarker(item);
    }
  };

  const findItem = (id, type) => {
    let item;
    if (type === "training") {
      item = trainings.find((el) => el.id === id);
    } else if (type === "peJob") {
      item = jobs.peJobs.find((el) => el.job.id === id);
    } else if (type === "lba") {
      item = jobs.lbaCompanies.find((el) => el.company.siret === id);
    } else if (type === "lbb") {
      item = jobs.lbbCompanies.find((el) => el.company.siret === id);
    } else if (type === "matcha") {
      item = jobs.matchas.find((el) => el.job.id === id);
    }

    return item;
  };

  const handleSearchSubmit = async (values, misc) => {
    // centrage de la carte sur le lieu de recherche
    const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];
    const searchTimestamp = new Date().getTime();
    setShouldShowWelcomeMessage(false);

    dispatch(setHasSearch(false));
    setSearchRadius(values.radius || 30);
    dispatch(setExtendedSearch(false));

    flyToLocation({ center: searchCenter, zoom: 10 });

    dispatch(setFormValues({ ...values }));

    if (scopeContext.isTraining) {
      searchForTrainings({values,searchTimestamp});
    }

    if (scopeContext.isJob) {
      searchForJobsWithStrictRadius({values,searchTimestamp});
    }
    dispatch(setIsFormVisible(false));

    if(misc!=="stayOnMap") {
      pushHistory({ router, scopeContext, display: "list", searchParameters:values, searchTimestamp });
    }
  };

  const handleItemLoad = async (item) => {
    setShouldShowWelcomeMessage(false);

    dispatch(setHasSearch(false));
    dispatch(setExtendedSearch(true));

    loadItem({
      item,
      dispatch,
      setTrainings,
      setHasSearch,
      setIsFormVisible,
      setTrainingMarkers,
      setSelectedItem,
      setCurrentPage,
      setTrainingSearchError,
      factorTrainingsForMap,
      setIsTrainingSearchLoading,
      setIsJobSearchLoading,
      computeMissingPositionAndDistance,
      setJobSearchError,
      setJobs,
      setJobMarkers,
      factorJobsForMap,
    });

    dispatch(setIsFormVisible(false));
  };

  const searchForTrainings = async ({values,searchTimestamp}) => {
    searchForTrainingsFunction({
      values,
      searchTimestamp,
      dispatch,
      setIsTrainingSearchLoading,
      setTrainingSearchError,
      clearTrainings,
      setTrainings,
      setHasSearch,
      setIsFormVisible,
      setTrainingMarkers,
      factorTrainingsForMap,
      widgetParameters,
    });
  };

  const searchForJobsWithStrictRadius = async ({values,searchTimestamp}) => {
    searchForJobs({values,searchTimestamp,strictRadius:"strict"});
  };

  const searchForJobs = async ({values, searchTimestamp, strictRadius}) => {
    searchForJobsFunction({
      values,
      strictRadius,
      searchTimestamp,
      setIsJobSearchLoading,
      dispatch,
      setHasSearch,
      setJobSearchError,
      setAllJobSearchError,
      computeMissingPositionAndDistance,
      setJobs,
      setJobMarkers,
      factorJobsForMap,
      scopeContext,
      widgetParameters,
    });
  };

  const clearTrainings = () => {
    dispatch(setTrainings([]));
    setTrainingMarkers(null);
    closeMapPopups();
  };

  const showSearchForm = (e, doNotSaveToHistory) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList")); // affichage de la colonne resultList / searchForm
    dispatch(setIsFormVisible(true));

    if (!doNotSaveToHistory) {
      unSelectItem("doNotSaveToHistory");
      pushHistory({ router, scopeContext, display: "form" });
    }
  };

  const showResultMap = (e, doNotSaveToHistory) => {
    if (e) {
      e.stopPropagation();
    }

    if (!isMapInitialized) {
      dispatch(setShouldMapBeVisible(true));
    }
    dispatch(setVisiblePane("resultMap"));

    if (!doNotSaveToHistory) {
      pushHistory({ router, scopeContext, display: "map" });
    }

    // hack : force le redimensionnement de la carte qui peut n'occuper qu'une fraction de l'écran en mode mobile
    setTimeout(() => {
      resizeMap();
    }, 50);
  };

  const showResultList = (e, doNotSaveToHistory) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList"));
    dispatch(setIsFormVisible(false));

    if (!doNotSaveToHistory) {
      pushHistory({ router, scopeContext, display: "list", searchParameters:formValues });
    }
  };

  const selectItemOnMap = (item) => {
    showResultList(null, "doNotSaveToHistory");
    setCurrentPage("fiche");
    pushHistory({ router, scopeContext, item, page: "fiche", display: "list" });
  };

  const unSelectItem = (doNotSaveToHistory) => {
    dispatch(setSelectedItem(null));
    setSelectedMarker(null);
    if (selectedItem) {
      dispatch(setItemToScrollTo(selectedItem));
    }

    if (!doNotSaveToHistory) {
      pushHistory({ router, scopeContext });
    }
  };

  return (
    <div className="page demoPage c-searchfor">
      <InitWidgetSearchParameters
        handleSearchSubmit={handleSearchSubmit}
        handleItemLoad={handleItemLoad}
        setIsLoading={setIsLoading}
      />
      <WidgetHeader handleSearchSubmit={handleSearchSubmit} />
      <Row className={`c-searchfor__row is-visible-${isFormVisible} is-welcome-${shouldShowWelcomeMessage} `}>
        <Col
          className={`choiceCol-container leftShadow ${
            visiblePane === "resultList" ? "activeXSPane" : "inactiveXSPane"
          }`}
          xs="12"
          md="5"
        >
          <ChoiceColumn
            shouldShowWelcomeMessage={shouldShowWelcomeMessage}
            handleSearchSubmit={handleSearchSubmit}
            showResultList={showResultList}
            showSearchForm={showSearchForm}
            unSelectItem={unSelectItem}
            searchRadius={searchRadius}
            isTrainingSearchLoading={isTrainingSearchLoading}
            searchForTrainings={searchForTrainings}
            trainingSearchError={trainingSearchError}
            searchForJobs={searchForJobs}
            searchForJobsWithStrictRadius={searchForJobsWithStrictRadius}
            isJobSearchLoading={isJobSearchLoading}
            jobSearchError={jobSearchError}
            allJobSearchError={allJobSearchError}
            isLoading={isLoading}
          />
        </Col>
        <Col className={`p-0 ${visiblePane === "resultMap" ? "activeXSPane" : "inactiveXSPane"}`} xs="12" md="7">
          <Map
            handleSearchSubmit={handleSearchSubmit}
            showSearchForm={showSearchForm}
            selectItemOnMap={selectItemOnMap}
          />
        </Col>
      </Row>
      <MapListSwitchButton
        showSearchForm={showSearchForm}
        showResultMap={showResultMap}
        showResultList={showResultList}
      />
    </div>
  );
};

export default SearchForTrainingsAndJobs;
