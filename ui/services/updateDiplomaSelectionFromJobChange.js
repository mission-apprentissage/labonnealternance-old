import fetchDiplomas from "../services/fetchDiplomas";

export default async function updateDiplomaSelectionFromJobChange(job, setDiplomasFunc) {
  let diplomas = [];
  if (job) {
    diplomas = await fetchDiplomas(job.romes, job.rncps);
  }

  setTimeout(() => {
    setDiplomasFunc(diplomas);
  }, 0);
};
