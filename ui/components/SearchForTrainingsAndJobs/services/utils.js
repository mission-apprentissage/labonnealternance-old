import baseUrl from "utils/baseUrl";

const trainingsApi = baseUrl + "/api/v1/formations";
const trainingApi = trainingsApi + "/formation";
const jobsApi = baseUrl + "/api/v1/jobs";
const offreApi = jobsApi + "/job";
const companyApi = jobsApi + "/company";
const matchaApi = jobsApi + "/matcha";

const allJobSearchErrorText = "Problème momentané d'accès aux opportunités d'emploi";
const partialJobSearchErrorText = "Problème momentané d'accès à certaines opportunités d'emploi";
const trainingErrorText = "Oups ! Les résultats formation ne sont pas disponibles actuellement !";
const notFoundErrorText = "L'élément recherché n'existe plus";
const technicalErrorText = "Error technique momentanée";

const getRomeFromParameters = ({ values, widgetParameters }) => {
  return widgetParameters?.parameters?.jobName &&
    widgetParameters?.parameters?.romes &&
    widgetParameters?.parameters?.frozenJob
    ? widgetParameters?.parameters?.romes
    : values.job.romes.join(",");
};

const getRncpsFromParameters = ({ values, widgetParameters }) => {
  return widgetParameters?.parameters?.jobName &&
    widgetParameters?.parameters?.romes &&
    widgetParameters?.parameters?.frozenJob
    ? ""
    : values.job?.rncps
    ? values.job.rncps.join(",")
    : "";
};

const isDepartmentJob = (job) => {
  let isDepartmentJob = false;
  if (
    !job.place.distance &&
    (!job.place.zipCode || job.place.zipCode.substring(0, 2) === job.place.city.substring(0, 2))
  ) {
    isDepartmentJob = true;
  }

  console.log("isDepartmentJob ", isDepartmentJob);

  return isDepartmentJob;
};

export {
  trainingApi,
  trainingsApi,
  jobsApi,
  allJobSearchErrorText,
  partialJobSearchErrorText,
  trainingErrorText,
  technicalErrorText,
  notFoundErrorText,
  getRomeFromParameters,
  getRncpsFromParameters,
  offreApi,
  matchaApi,
  companyApi,
  isDepartmentJob,
};
