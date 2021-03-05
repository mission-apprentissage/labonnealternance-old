import React, { useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { getItemQueryParameters } from "utils/getItemId";
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
import baseUrl from "utils/baseUrl";
import { currentPage, setCurrentPage } from "utils/currentPage";
import { logError } from "utils/tools";
import updateUiFromHistory from "services/updateUiFromHistory";

const allJobSearchErrorText = "Problème momentané d'accès aux opportunités d'emploi";
const partialJobSearchErrorText = "Problème momentané d'accès à certaines opportunités d'emploi";
const trainingErrorText = "Oups ! Les résultats formation ne sont pas disponibles actuellement !";
const technicalErrorText = "Error technique momentanée";

const trainingsApi = baseUrl + "/api/v1/formations";
const trainingApi = trainingsApi + "/formation";
const jobsApi = baseUrl + "/api/v1/jobs";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();
  const scopeContext = useScopeContext();

  const { trainings, jobs, hasSearch, selectedItem, widgetParameters, visiblePane, isFormVisible } = useSelector(
    (state) => state.trainings
  );

  const [shouldShowWelcomeMessage, setShouldShowWelcomeMessage] = useState(true);
  const [searchRadius, setSearchRadius] = useState(30);
  const [isTrainingSearchLoading, setIsTrainingSearchLoading] = useState(hasSearch ? false : true);

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

  /* a repositionner  */
  const selectItemFromHistory = (itemId, type) => {
    const item = findItem(itemId, type);

    flyToMarker(item, 12);
    closeMapPopups();
    dispatch(setSelectedItem(item));
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

    loadItem(item);

    dispatch(setIsFormVisible(false));
  };

  const loadItem = async (values) => {
    try {
      if (values.type === "training") {
        const response = await axios.get(trainingApi + "/" + values.itemId);

        if (response.data.result === "error") {
          logError("Training Search Error", `${response.data.message}`);
          setTrainingSearchError(trainingErrorText);
        }

        dispatch(setTrainings(response.data.results));
        dispatch(setHasSearch(true));
        dispatch(setIsFormVisible(false));

        if (response.data.results.length) {
          setTrainingMarkers(factorTrainingsForMap(response.data.results));
        }
        dispatch(setSelectedItem(response.data.results[0]));
        setCurrentPage("fiche");
      }
    } catch (err) {
      console.log(
        `Erreur interne lors de la recherche de formations (${err.response ? err.response.status : ""} : ${
          err.response.data ? err.response.data.error : ""
        })`
      );
      logError("Training search error", err);
      setTrainingSearchError(trainingErrorText);
    }

    setIsTrainingSearchLoading(false);
    setIsJobSearchLoading(false);
    return;
  };

  const searchForTrainings = async (values) => {
    setIsTrainingSearchLoading(true);
    setTrainingSearchError("");
    clearTrainings();
    try {
      const response = await axios.get(trainingsApi, {
        params: {
          romes: getRomeFromParameters(values),
          longitude: values.location.value.coordinates[0],
          latitude: values.location.value.coordinates[1],
          radius: values.radius || 30,
          diploma: values.diploma,
        },
      });

      if (response.data.result === "error") {
        logError("Training Search Error", `${response.data.message}`);
        setTrainingSearchError(trainingErrorText);
      }

      dispatch(setTrainings(response.data.results));
      dispatch(setHasSearch(true));
      dispatch(setIsFormVisible(false));

      if (response.data.results.length) {
        setTrainingMarkers(factorTrainingsForMap(response.data.results));
      }
    } catch (err) {
      console.log(
        `Erreur interne lors de la recherche de formations (${err.response ? err.response.status : ""} : ${
          err.response.data ? err.response.data.error : ""
        })`
      );
      logError("Training search error", err);
      setTrainingSearchError(trainingErrorText);
    }

    setIsTrainingSearchLoading(false);
  };

  const searchForJobsWithStrictRadius = async (values) => {
    searchForJobs(values, "strict");
  };

  const searchForJobs = async (values, strictRadius) => {
    setIsJobSearchLoading(true);
    setJobSearchError("");
    setAllJobSearchError(false);

    try {
      const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];

      const response = await axios.get(jobsApi, {
        params: {
          romes: getRomeFromParameters(values),
          longitude: values.location.value.coordinates[0],
          latitude: values.location.value.coordinates[1],
          insee: values.location.insee,
          zipcode: values.location.zipcode,
          radius: values.radius || 30,
          strictRadius: strictRadius ? "strict" : null,
        },
      });

      let peJobs = null;

      let results = {};

      if (response.data === "romes_missing") {
        setJobSearchError(technicalErrorText);
        logError("Job search error", `Missing romes`);
      } else {
        if (!response.data.peJobs.result || response.data.peJobs.result !== "error")
          peJobs = await computeMissingPositionAndDistance(searchCenter, response.data.peJobs.results);

        results = {
          peJobs: response.data.peJobs.result && response.data.peJobs.result === "error" ? null : peJobs,
          lbbCompanies:
            response.data.lbbCompanies.result && response.data.lbbCompanies.result === "error"
              ? null
              : response.data.lbbCompanies.results,
          lbaCompanies:
            response.data.lbaCompanies.result && response.data.lbaCompanies.result === "error"
              ? null
              : response.data.lbaCompanies.results,
        };
      }

      // gestion des erreurs
      let jobErrorMessage = "";
      if (
        response.data.peJobs.result === "error" &&
        response.data.lbbCompanies.result === "error" &&
        response.data.lbaCompanies.result === "error"
      ) {
        //TODO: définition niveau d'erreur JOB total
        setAllJobSearchError(true);
        jobErrorMessage = allJobSearchErrorText;
        logError(
          "Job Search Error",
          `All job sources in error. PE : ${response.data.peJobs.message} - LBB : ${response.data.lbbCompanies.message} - LBA : ${response.data.lbaCompanies.message}`
        );
      } else {
        if (
          response.data.peJobs.result === "error" ||
          response.data.lbbCompanies.result === "error" ||
          response.data.lbaCompanies.result === "error"
        ) {
          jobErrorMessage = partialJobSearchErrorText;
          if (response.data.peJobs.result === "error")
            logError("Job Search Error", `PE Error : ${response.data.peJobs.message}`);
          if (response.data.lbbCompanies.result === "error")
            logError("Job Search Error", `LBB Error : ${response.data.lbbCompanies.message}`);
          if (response.data.lbaCompanies.result === "error")
            logError("Job Search Error", `LBA Error : ${response.data.lbaCompanies.message}`);
        }
      }

      if (jobErrorMessage) setJobSearchError(jobErrorMessage);

      dispatch(setJobs(results));
      dispatch(setHasSearch(true));

      setJobMarkers(factorJobsForMap(results), scopeContext.isTraining ? null : searchCenter);
    } catch (err) {
      console.log(
        `Erreur interne lors de la recherche d'emplois (${
          err.response && err.response.status ? err.response.status : ""
        } : ${err.response && err.response.data ? err.response.data.error : err.message})`
      );
      logError("Job search error", err);
      setJobSearchError(allJobSearchErrorText);
      setAllJobSearchError(true);
    }

    setIsJobSearchLoading(false);
  };

  const clearTrainings = () => {
    dispatch(setTrainings([]));
    setTrainingMarkers(null);
    closeMapPopups();
  };

  const getRomeFromParameters = (values) => {
    return widgetParameters?.parameters?.jobName &&
      widgetParameters?.parameters?.romes &&
      widgetParameters?.parameters?.frozenJob
      ? widgetParameters?.parameters?.romes
      : values.job.romes.join(",");
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
    <div className="page demoPage">
      <InitWidgetSearchParameters
        handleSubmit={handleSubmit}
        handleItemLoad={handleItemLoad}
        setIsLoading={setIsLoading}
      />
      <WidgetHeader handleSubmit={handleSubmit} />
      <Row>
        <Col
          className={`leftShadow ${visiblePane === "resultList" ? "activeXSPane" : "inactiveXSPane"}`}
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
        <Col className={`vh-100 ${visiblePane === "resultMap" ? "activeXSPane" : "inactiveXSPane"}`} xs="12" md="7">
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
