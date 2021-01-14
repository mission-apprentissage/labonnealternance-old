import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import distance from "@turf/distance";
import baseUrl from "utils/baseUrl";
import { scrollToTop, scrollToElementInContainer, logError, getItemElement } from "utils/tools";
import ItemDetail from "components/ItemDetail/ItemDetail";
import Spinner from "components/Spinner";
import { setJobMarkers, setTrainingMarkers } from "../utils/mapTools";
import SearchForm from "./SearchForm";
import ResultLists from "./ResultLists";
import {
  setTrainings,
  setJobs,
  setSelectedItem,
  setItemToScrollTo,
  setFormValues,
  setExtendedSearch,
  setHasSearch,
  setIsFormVisible,
  setWidgetParameters,
} from "store/actions";
import {
  map,
  flyToMarker,
  closeMapPopups,
  factorTrainingsForMap,
  factorJobsForMap,
  computeMissingPositionAndDistance,
} from "utils/mapTools";
import { useScopeContext } from "context/ScopeContext";

import { fetchAddressFromCoordinates } from "services/baseAdresse";

const allJobSearchErrorText = "Problème momentané d'accès aux opportunités d'emploi";
const partialJobSearchErrorText = "Problème momentané d'accès à certaines opportunités d'emploi";
const trainingErrorText = "Oups ! Les résultats formation ne sont pas disponibles actuellement !";
const technicalErrorText = "Error technique momentanée";

const trainingsApi = baseUrl + "/api/v1/formations";
const jobsApi = baseUrl + "/api/v1/jobs";

const RightColumn = ({ showResultList, unSelectItem, showSearchForm }) => {
  const dispatch = useDispatch();

  const scopeContext = useScopeContext();

  const {
    hasSearch,
    trainings,
    jobs,
    selectedItem,
    itemToScrollTo,
    formValues,
    widgetParameters,
    shouldExecuteSearch,
  } = useSelector((state) => state.trainings);

  const [isLoading, setIsLoading] = useState(hasSearch ? false : true);
  const [isTrainingSearchLoading, setIsTrainingSearchLoading] = useState(hasSearch ? false : true);
  const [isJobSearchLoading, setIsJobSearchLoading] = useState(hasSearch ? false : true);
  const [searchRadius, setSearchRadius] = useState(30);
  const [jobSearchError, setJobSearchError] = useState("");
  const [allJobSearchError, setAllJobSearchError] = useState(false);

  //TODO: définition niveau d'erreur JOB partiel  ou total

  const [trainingSearchError, setTrainingSearchError] = useState("");

  useEffect(() => {
    if (itemToScrollTo) {
      const itemElement = getItemElement(itemToScrollTo);

      if (itemElement) {
        scrollToElementInContainer("rightColumn", itemElement, 50, "auto");
        dispatch(setItemToScrollTo(null));
      }
    }
  });

  useEffect(() => {
    if (widgetParameters && widgetParameters.applyWidgetParameters) {
      launchWidgetSearch(widgetParameters);
      dispatch(setWidgetParameters({ ...widgetParameters, applyWidgetParameters: false })); // action one shot
    }
  });

  useEffect(() => {
    if (shouldExecuteSearch) {
      executeSearch(formValues);
    }
  }, []);

  const executeSearch = (values) => {
    setIsLoading(true);
    try {
      executeSearchWhenMapIsReady(values);
    } catch (err) {
      logError("Search error", err);
    }
  };

  const executeSearchWhenMapIsReady = async (values) => {
    while (
      !map.getSource("job-points") ||
      !map.getSource("training-points") // attente que la map soit prête
    )
      await new Promise((resolve) => setTimeout(resolve, 350));
    await handleSubmit(values);
  };

  const handleSelectItem = (item, type) => {
    flyToMarker(item, 12);
    closeMapPopups();
    dispatch(setSelectedItem(item));
  };

  const handleClose = () => {
    unSelectItem();
  };

  const launchWidgetSearch = async () => {
    setIsLoading(true);
    const p = widgetParameters.parameters;
    try {
      // récupération du code insee depuis la base d'adresse
      const addresses = await fetchAddressFromCoordinates([p.lon, p.lat]);

      if (addresses.length) {
        let values = {
          location: {
            value: {
              type: "Point",
              coordinates: [p.lon, p.lat],
            },
            insee: addresses[0].insee,
          },
          job: {
            romes: p.romes.split(","),
          },
          radius: p.radius || 30,
          ...addresses[0],
        };

        executeSearchWhenMapIsReady(values);
      } else {
        console.log("aucun lieu trouvé");
      }

    } catch (err) {
      logError("WidgetSearch error", err);
    }
  };

  const handleSubmit = async (values) => {
    // centrage de la carte sur le lieu de recherche
    const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];

    dispatch(setHasSearch(false));
    setSearchRadius(values.radius || 30);
    dispatch(setExtendedSearch(false));
    map.flyTo({ center: searchCenter, zoom: 10 });
    dispatch(setFormValues({ ...values }));

    if (scopeContext.isTraining) {
      searchForTrainings(values);
    }

    if (scopeContext.isJob) {
      searchForJobsWithStrictRadius(values);
    }
    // HERE
    setIsLoading(false);
    dispatch(setIsFormVisible(false));
  };

  const searchForJobsOnNewCenter = async (newCenter) => {
    searchOnNewCenter(newCenter, null, "jobs");
  };

  const searchForTrainingsOnNewCenter = async (newCenter) => {
    searchOnNewCenter(newCenter, "trainings", null);
  };

  const searchOnNewCenter = async (newCenter, isTrainingSearch, isJobSearch) => {
    dispatch(setExtendedSearch(false));

    scrollToTop("rightColumn");

    formValues.location = newCenter;

    dispatch(setFormValues(formValues));

    // mise à jour des infos de distance des formations par rapport au nouveau centre de recherche
    if (isJobSearch) updateTrainingDistanceWithNewCenter(formValues.location.value.coordinates);

    map.flyTo({ center: formValues.location.value.coordinates, zoom: 10 });

    searchForJobsWithStrictRadius(formValues);

    if (isTrainingSearch) searchForTrainings(formValues);
  };

  const updateTrainingDistanceWithNewCenter = (coordinates) => {
    for (let i = 0; i < trainings.length; ++i) {
      //const trainingCoords = [trainings[i].place.longitude, trainings[i].place.latitude];
      trainings[i].place.distance =
        Math.round(10 * distance(coordinates, [trainings[i].place.longitude, trainings[i].place.latitude])) / 10;
    }
    dispatch(setTrainings(trainings));
  };

  const clearTrainings = () => {
    dispatch(setTrainings([]));
    setTrainingMarkers(null);
    closeMapPopups();
  };

  const searchForTrainings = async (values) => {
    setIsTrainingSearchLoading(true);
    setTrainingSearchError("");
    clearTrainings();
    try {
      const response = await axios.get(trainingsApi, {
        params: {
          romes: values.job.romes.join(","),
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

  const searchForJobsWithLooseRadius = async () => {
    dispatch(setExtendedSearch(true));
    scrollToTop("rightColumn");

    dispatch(setJobs([]));
    searchForJobs(formValues, null);
  };

  const searchForJobs = async (values, strictRadius) => {
    setIsJobSearchLoading(true);
    setJobSearchError("");
    setAllJobSearchError(false);

    try {
      const searchCenter = [values.location.value.coordinates[0], values.location.value.coordinates[1]];

      const response = await axios.get(jobsApi, {
        params: {
          romes: values.job.romes.join(","),
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

      setJobMarkers(factorJobsForMap(results));
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

  const getResultLists = () => {
    return (
      <ResultLists
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
        showSearchForm={showSearchForm}
        isTrainingSearchLoading={isTrainingSearchLoading}
        isJobSearchLoading={isJobSearchLoading}
        searchRadius={searchRadius}
        trainings={trainings}
        handleExtendedSearch={searchForJobsWithLooseRadius}
        searchForJobsOnNewCenter={searchForJobsOnNewCenter}
        searchForTrainingsOnNewCenter={searchForTrainingsOnNewCenter}
        jobs={jobs}
        jobSearchError={jobSearchError}
        allJobSearchError={allJobSearchError}
        trainingSearchError={trainingSearchError}
      />
    );
  };

  const getSearchForm = () => {
    return <SearchForm selectedItem={selectedItem} showResultList={showResultList} handleSubmit={handleSubmit} />;
  };

  const getSelectedItemDetail = () => {
    return <ItemDetail selectedItem={selectedItem} handleClose={handleClose} />;
  };

  return (
    <div id="rightColumn" className="rightCol">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {getSearchForm()}
          {getResultLists()}
          {getSelectedItemDetail()}
        </>
      )}
    </div>
  );
};

export default RightColumn;
