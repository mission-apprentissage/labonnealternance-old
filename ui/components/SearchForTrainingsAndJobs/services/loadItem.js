import axios from "axios";
import { logError } from "utils/tools";

import { trainingApi, trainingErrorText } from "components/SearchForTrainingsAndJobs/services/utils";

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
}) => {
  try {
    if (item.type === "training") {
      const response = await axios.get(trainingApi + "/" + item.itemId);

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
    }
    else if (item.type === "training")
    {

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
