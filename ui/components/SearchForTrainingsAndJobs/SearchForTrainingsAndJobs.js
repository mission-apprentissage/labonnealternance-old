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

  const { trainings, jobs, hasSearch, selectedItem, widgetParameters, visiblePane, isFormVisible } = useSelector(
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
    }

    return item;
  };

  const handleSubmit = async (values) => {
    // centrage de la carte sur le lieu de recherche
    const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];

    setShouldShowWelcomeMessage(false);

    dispatch(setHasSearch(false));
    setSearchRadius(values.radius || 30);
    dispatch(setExtendedSearch(false));

    flyToLocation({ center: searchCenter, zoom: 10 });

    dispatch(setFormValues({ ...values }));

    if (scopeContext.isTraining) {
      searchForTrainings(values);
    }

    if (scopeContext.isJob) {
      searchForJobsWithStrictRadius(values);
    }
    dispatch(setIsFormVisible(false));

    pushHistory({ router, scopeContext, display: "list" });
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

  const searchForTrainings = async (values) => {
    searchForTrainingsFunction({
      values,
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

  const searchForJobsWithStrictRadius = async (values) => {
    searchForJobs(values, "strict");
  };

  const searchForJobs = async (values, strictRadius) => {
    searchForJobsFunction({
      values,
      strictRadius,
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
      pushHistory({ router, scopeContext, display: "list" });
    }
  };

  const selectItemOnMap = (item) => {
    showResultList(null, "doNotSaveToHistory");
    setCurrentPage("fiche");
    pushHistory({ router, scopeContext, item, page: "fiche", display: "list" });
  };

  const unSelectItem = (doNotSaveToHistory) => {
    dispatch(setSelectedItem(null));
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
        handleSubmit={handleSubmit}
        handleItemLoad={handleItemLoad}
        setIsLoading={setIsLoading}
      />
      <WidgetHeader handleSubmit={handleSubmit} />
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
            handleSubmit={handleSubmit}
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
          <Map selectItemOnMap={selectItemOnMap} />
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
