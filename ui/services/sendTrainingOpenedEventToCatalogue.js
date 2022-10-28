import axios from "axios";
import env from "../utils/env";

export default async function sendTrainingOpenedEventToCatalogue(cleMinistereEducatif) {
  if (!cleMinistereEducatif) return;

  const catalogueApi = `https://catalogue${
    env !== "production" ? "-recette" : ""
  }.apprentissage.beta.gouv.fr/api/stats`;

  if (cleMinistereEducatif?.indexOf("test") >= 0) {
    // not sending data, because of test mode
    console.log(`Test mode, not sending TrainingOpenedEventToCatalogue with cleMinistereEducatif ${cleMinistereEducatif}`)
  } else {
    try {
      axios.post(catalogueApi, {
        source: `LBA${env !== "production" ? "-recette" : ""}`,
        cle_ministere_educatif: cleMinistereEducatif,
      });
    } catch (err) {}
  }


  return;
}
 