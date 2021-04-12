import fetchDiplomas from "services/fetchDiplomas";


export default async function updateDiplomaSelectionFromJobChange(job, setDiplomaErrorFunc, setDiplomasFunc) {
  let diplomas = [];
  if (job) {
    diplomas = await fetchDiplomas(job.romes, job.rncps, () => {
      setDiplomaErrorFunc(true);
    });
  }

  setTimeout(() => {
    setDiplomasFunc(diplomas);
  }, 0);
};
