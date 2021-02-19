import fetchDiplomas from "services/fetchDiplomas";


export default async function (job, setDiplomaErrorFunc, setDiplomasFunc) {
  let diplomas = [];
  if (job) {
    diplomas = await fetchDiplomas(job.romes, () => {
      setDiplomaErrorFunc(true);
    });
  }

  setTimeout(() => {
    setDiplomasFunc(diplomas);
  }, 0);
};
