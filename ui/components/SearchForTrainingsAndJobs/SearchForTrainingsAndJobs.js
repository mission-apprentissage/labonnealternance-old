import React, { useState } from "react";

import { Row, Col } from "reactstrap";
import axios from "axios";

import { MapListSwitchButton, ChoiceColumn } from "./components";
import baseUrl from "utils/baseUrl";
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
  flyToLocation,
  closeMapPopups,
  factorTrainingsForMap,
  factorJobsForMap,
  computeMissingPositionAndDistance,
  setJobMarkers,
  setTrainingMarkers,
} from "utils/mapTools";
import { logError } from "utils/tools";
import { useScopeContext } from "context/ScopeContext";

import { useDispatch, useSelector } from "react-redux";
import { resizeMap, isMapInitialized } from "utils/mapTools";
import WidgetHeader from "components/WidgetHeader/WidgetHeader";
import InitWidgetSearchParameters from "components/WidgetHeader/InitWidgetSearchParameters";
import Map from "components/Map";

const allJobSearchErrorText = "Problème momentané d'accès aux opportunités d'emploi";
const partialJobSearchErrorText = "Problème momentané d'accès à certaines opportunités d'emploi";
const trainingErrorText = "Oups ! Les résultats formation ne sont pas disponibles actuellement !";
const technicalErrorText = "Error technique momentanée";

const trainingsApi = baseUrl + "/api/v1/formations";
const jobsApi = baseUrl + "/api/v1/jobs";

const SearchForTrainingsAndJobs = () => {
  const dispatch = useDispatch();
  const scopeContext = useScopeContext();

  const { hasSearch, selectedItem, widgetParameters, visiblePane } = useSelector((state) => state.trainings);

  const [shouldShowWelcomeMessage, setShouldShowWelcomeMessage] = useState(true);
  const [searchRadius, setSearchRadius] = useState(30);
  const [isTrainingSearchLoading, setIsTrainingSearchLoading] = useState(hasSearch ? false : true);

  const [isJobSearchLoading, setIsJobSearchLoading] = useState(hasSearch ? false : true);
  const [jobSearchError, setJobSearchError] = useState("");
  const [allJobSearchError, setAllJobSearchError] = useState(false);
  const [trainingSearchError, setTrainingSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(hasSearch ? false : true);

  // See https://www.robinwieruch.de/react-useeffect-only-on-update
  /*const didMount = React.useRef(false);
  React.useEffect(() => {
    if (didMount.current) {
      if (!isMobile) {
        // will only run if "isMobile" change !
        showResultList()
      }
    } else {
      didMount.current = true;
    }
  }, [isMobile]);*/

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

  const showSearchForm = (e) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList")); // affichage de la colonne resultList / searchForm
    dispatch(setIsFormVisible(true));
    unSelectItem();
  };

  const showResultMap = (e) => {
    if (e) {
      e.stopPropagation();
    }

    if (!isMapInitialized) {
      dispatch(setShouldMapBeVisible(true));
    }
    dispatch(setVisiblePane("resultMap"));

    // hack : force le redimensionnement de la carte qui peut n'occuper qu'une fraction de l'écran en mode mobile
    setTimeout(() => {
      resizeMap();
    }, 50);
  };

  const showResultList = (e) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setVisiblePane("resultList"));
    dispatch(setIsFormVisible(false));
  };

  const unSelectItem = () => {
    if (selectedItem) {
      dispatch(setSelectedItem(null));
      dispatch(setItemToScrollTo(selectedItem));
    }
  };

  return (
    <div className="page demoPage">
      <InitWidgetSearchParameters handleSubmit={handleSubmit} setIsLoading={setIsLoading} />
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
          <Map showResultList={showResultList} />
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
