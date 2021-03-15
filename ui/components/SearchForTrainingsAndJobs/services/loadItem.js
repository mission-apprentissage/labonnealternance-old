import axios from "axios";
import { logError } from "utils/tools";

import {
  trainingApi,
  offreApi,
  companyApi,
  trainingErrorText,
  partialJobSearchErrorText,
  notFoundErrorText,
} from "components/SearchForTrainingsAndJobs/services/utils";

import { flyToMarker } from "utils/mapTools";

export const loadItem = async ({
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
}) => {
  try {
    dispatch(setHasSearch(true));
    dispatch(setIsFormVisible(false));

    let itemMarker = null;

    if (item.type === "training") {
      const response = await axios.get(trainingApi + "/" + item.itemId);

      if (response.data.result === "error") {
        logError("Training Search Error", `${response.data.message}`);
        setTrainingSearchError(trainingErrorText);
      }

      dispatch(setTrainings(response.data.results));

      if (response.data.results.length) {
        setTrainingMarkers(factorTrainingsForMap(response.data.results));
      }
      dispatch(setSelectedItem(response.data.results[0]));
      itemMarker = response.data.results[0];
    } else if (item.type === "peJob") {
      const response = await axios.get(offreApi + "/" + item.itemId);

      // gestion des erreurs
      if (!response.data.message) {
        let peJobs = await computeMissingPositionAndDistance(null, response.data.peJobs);

        let results = {
          peJobs: peJobs,
          lbbCompanies: null,
          lbaCompanies: null,
        };

        dispatch(setJobs(results));

        dispatch(setHasSearch(true));

        setJobMarkers(factorJobsForMap(results), null);
        dispatch(setSelectedItem(results.peJobs[0]));
        itemMarker = results.peJobs[0];
      } else {
        logError("Job Load Error", `PE Error : ${response.data.message}`);
        setJobSearchError(response.data.result === "not_found" ? notFoundErrorText : partialJobSearchErrorText);
      }
    } else if (item.type === "lba" || item.type === "lbb") {
      const response = await axios.get(`${companyApi}/${item.itemId}?type=${item.type}`);

      // gestion des erreurs
      if (!response.data.message) {
        let companies = item.type === "lbb" ? response.data.lbbCompanies : response.data.lbaCompanies;

        const loadedItem = companies[0];
        let results = {
          peJobs: null,
          lbbCompanies: item.type === "lbb" ? companies : null,
          lbaCompanies: item.type === "lba" ? companies : null,
        };

        dispatch(setJobs(results));

        dispatch(setHasSearch(true));

        setJobMarkers(factorJobsForMap(results), null);
        dispatch(setSelectedItem(loadedItem));
        itemMarker = loadedItem;
      } else {
        logError("Job Load Error", `PE Error : ${response.data.message}`);
        setJobSearchError(response.data.result === "not_found" ? notFoundErrorText : partialJobSearchErrorText);
      }
    }

    if (itemMarker) {
      flyToMarker(itemMarker, 12);
    }
    setCurrentPage("fiche");
  } catch (err) {
    console.log(
      `Erreur interne lors du chargement d'un élément (${err.response ? err.response.status : ""} : ${
        err?.response?.data ? err.response.data.error : ""
      })`
    );
    logError("Training search error", err);
    setTrainingSearchError(trainingErrorText);
  }

  setIsTrainingSearchLoading(false);
  setIsJobSearchLoading(false);
  return;
};
