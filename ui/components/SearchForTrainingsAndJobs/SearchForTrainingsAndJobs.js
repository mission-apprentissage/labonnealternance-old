/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { loadItem } from "components/SearchForTrainingsAndJobs/services/loadItem";
import { searchForTrainingsFunction } from "components/SearchForTrainingsAndJobs/services/searchForTrainings";
import { searchForJobsFunction } from "components/SearchForTrainingsAndJobs/services/searchForJobs";
import { useDispatch, useSelector } from "react-redux";
import pushHistory from "utils/pushHistory";
import {
  setIsFormVisible,
  setVisiblePane,
  setShouldMapBeVisible,
  setFormValues,  
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
  coordinatesOfFrance,
} from "utils/mapTools";

import { ScopeContext } from "context/ScopeContext";
import { SearchResultContext } from "context/SearchResultContextProvider";

import Map from "components/Map";
import { Row, Col } from "reactstrap";
import { MapListSwitchButton, ChoiceColumn } from "./components";
import { WidgetHeader, InitWidgetSearchParameters } from "components/WidgetHeader";
import { currentPage, setCurrentPage, currentSearch, setCurrentSearch } from "utils/currentPage";
import updateUiFromHistory from "services/updateUiFromHistory";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();
  const scopeContext = useContext(ScopeContext);
  
  const { widgetParameters, visiblePane, isFormVisible, formValues, opcoFilter } = useSelector(
    (state) => state.trainings
  );

  const { hasSearch, trainings, jobs, setTrainings, setJobs, selectedItem, setSelectedItem, setItemToScrollTo, setExtendedSearch, setHasSearch } = useContext(SearchResultContext);

  const [searchRadius, setSearchRadius] = useState(30);
  const [isTrainingSearchLoading, setIsTrainingSearchLoading] = useState(hasSearch ? false : true);
  const [shouldShowWelcomeMessage, setShouldShowWelcomeMessage] = useState(hasSearch ? false : true);
  const [activeFilter, setActiveFilter] = useState("all");

  const [isJobSearchLoading, setIsJobSearchLoading] = useState(hasSearch ? false : true);
  const [jobSearchError, setJobSearchError] = useState("");
  const [allJobSearchError, setAllJobSearchError] = useState(false);
  const [trainingSearchError, setTrainingSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(hasSearch ? false : true);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {

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
        dispatch,
        setTrainings,
        setJobs,
        setActiveFilter,
        activeFilter
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
    const item = findItem({itemId, type, jobs, trainings});
    selectItem(item);
  };

  const selectItem = (item) =>
  {
    closeMapPopups();
    if (item) {
      flyToMarker(item, 12);
      setSelectedItem(item);
      setSelectedMarker(item);
    }
  }

  const selectFollowUpItem = ({itemId, type, jobs, trainings, searchTimestamp, formValues}) =>
  {
    const item = findItem({itemId, type, jobs, trainings}); 

    if(item) {
      selectItem(item);
      try
      {
        pushHistory({ router, scopeContext, item:{id:itemId,ideaType:type==="training"?"formation":type, directId:true}, page: "fiche", display: "list", searchParameters:formValues, searchTimestamp, isReplace:true });
      }
      catch(err){}
    }
  }

  const findItem = ({itemId, type, jobs, trainings}) => {
    let item;

    if (type === "training") {
      item = trainings.find((el) => el.id === itemId);
    } else if (type === "peJob") {
      item = jobs.peJobs.find((el) => el.job.id === itemId);
    } else if (type === "lba") {
      item = jobs.lbaCompanies.find((el) => el.company.siret === itemId);
    } else if (type === "lbb") {
      item = jobs.lbbCompanies.find((el) => el.company.siret === itemId);
    } else if (type === "matcha") {
      item = jobs.matchas.find((el) => el.job.id === itemId);
    }

    return item;
  };

  const handleSearchSubmit = async ({values,followUpItem=null}) => {
    // centrage de la carte sur le lieu de recherche
    const searchCenter = values.location?.value?[values.location.value.coordinates[0], values.location.value.coordinates[1]]:null;
    const searchTimestamp = new Date().getTime();
    setShouldShowWelcomeMessage(false);

    setHasSearch(false);
    setSearchRadius(values.radius || 30);
    setExtendedSearch(false);

    if(searchCenter) { flyToLocation({ center: searchCenter, zoom: 10 }); }
    else { flyToLocation({ center: coordinatesOfFrance, zoom: 4 }); }
  
    dispatch(setFormValues({ ...values }));

    if (scopeContext.isTraining) {
      searchForTrainings({values,searchTimestamp,followUpItem,selectFollowUpItem});
    }

    if (scopeContext.isJob) {
      searchForJobs({values,searchTimestamp,followUpItem,selectFollowUpItem});
    }
    dispatch(setIsFormVisible(false));

    pushHistory({ router, scopeContext, display: "list", searchParameters:values, searchTimestamp });
    setCurrentSearch(searchTimestamp);
  };

  const handleItemLoad = async (item) => {
    setShouldShowWelcomeMessage(false);

    setHasSearch(false);
    setExtendedSearch(true);

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

  const searchForTrainings = async ({values, searchTimestamp, followUpItem, selectFollowUpItem}) => {
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
      followUpItem,
      selectFollowUpItem,
    });
  };

  const searchForJobs = async ({values, searchTimestamp, followUpItem, selectFollowUpItem}) => {
    searchForJobsFunction({
      values,
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
      followUpItem,
      selectFollowUpItem,      
      opcoFilter,
    });
  };

  const clearTrainings = () => {
    setTrainings([]);
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
      pushHistory({ router, scopeContext, display: "form", searchParameters:formValues, searchTimestamp: currentSearch });
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
      pushHistory({ router, scopeContext, display: "map", searchParameters:formValues, searchTimestamp: currentSearch });
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
      pushHistory({ router, scopeContext, display: "list", searchParameters:formValues, searchTimestamp: currentSearch });
    }
  };

  const selectItemOnMap = (item) => {
    showResultList(null, "doNotSaveToHistory");
    setCurrentPage("fiche");
    pushHistory({ router, scopeContext, item, page: "fiche", display: "list", searchParameters:formValues, searchTimestamp: currentSearch });
  };

  const unSelectItem = (doNotSaveToHistory) => {
    setSelectedItem(null);
    setSelectedMarker(null);
    if (selectedItem) {
      setItemToScrollTo(selectedItem);
    }

    if (!doNotSaveToHistory) {
      pushHistory({ router, scopeContext, searchParameters:formValues, searchTimestamp: currentSearch });
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
            isJobSearchLoading={isJobSearchLoading}
            jobSearchError={jobSearchError}
            allJobSearchError={allJobSearchError}
            isLoading={isLoading}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
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
