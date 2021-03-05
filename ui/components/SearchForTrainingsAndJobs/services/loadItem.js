import axios from "axios";
import { logError } from "utils/tools";

import {
  trainingApi,
  offreApi,
  companyApi,
  trainingErrorText,
  partialJobSearchErrorText,
} from "components/SearchForTrainingsAndJobs/services/utils";

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

    console.log("item : ",item);

    dispatch(setHasSearch(true));
    dispatch(setIsFormVisible(false));

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
    } else if (item.type === "peJob") {
      const response = await axios.get(offreApi + "/" + item.itemId);

      let peJobs = null;

      if (!response.data.peJobs.result || response.data.peJobs.result !== "error") {
        peJobs = await computeMissingPositionAndDistance(null, response.data.peJobs.results);
      }

      let results = {
        peJobs: peJobs,
        lbbCompanies: null,
        lbaCompanies: null,
      };

      // gestion des erreurs
      if (response.data.peJobs.result === "error") {
        logError("Job Load Error", `PE Error : ${response.data.peJobs.message}`);
        setJobSearchError(partialJobSearchErrorText);
      } else {
        dispatch(setJobs(results));

        dispatch(setHasSearch(true));

        setJobMarkers(factorJobsForMap(results), null);
        dispatch(setSelectedItem(results.peJobs[0]));
      }
    } else if (item.type === "lba" || item.type === "lbb") {
    }

    setCurrentPage("fiche");
  } catch (err) {
    console.log(
      `Erreur interne lors de la recherche de formations (${err.response ? err.response.status : ""} : ${
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
