import axios from "axios";
import env from "utils/env";

export default async function sendTrainingOpenedEventToCatalogue(idRco) {
  if (!idRco) return;

  const catalogueApi = `https://catalogue${
    env !== "production" ? "-recette" : ""
  }.apprentissage.beta.gouv.fr/api/stats`;
  try {
    axios.post(catalogueApi, { source: `LBA${env !== "production" ? "-recette" : ""}`, id_rco_formation: idRco });
  } catch (err) {}

  return;
}
