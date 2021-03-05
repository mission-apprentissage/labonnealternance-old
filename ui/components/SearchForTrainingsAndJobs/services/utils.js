import baseUrl from "utils/baseUrl";

const trainingsApi = baseUrl + "/api/v1/formations";
const trainingApi = trainingsApi + "/formation";
const jobsApi = baseUrl + "/api/v1/jobs";

const allJobSearchErrorText = "Problème momentané d'accès aux opportunités d'emploi";
const partialJobSearchErrorText = "Problème momentané d'accès à certaines opportunités d'emploi";
const trainingErrorText = "Oups ! Les résultats formation ne sont pas disponibles actuellement !";
const technicalErrorText = "Error technique momentanée";

export {
  trainingApi,
  trainingsApi,
  jobsApi,
  allJobSearchErrorText,
  partialJobSearchErrorText,
  trainingErrorText,
  technicalErrorText,
};
