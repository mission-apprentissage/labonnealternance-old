import axios from "axios";
import env from "../utils/env";
import _ from "lodash";
import { logError } from "../utils/tools";

export default async function fetchPrdv(training, hasAlsoJob, _axios = axios, _window = window, _logError = logError) {
  let res = null;

  const prdvEndpoint = `https://rdv-cfa${
    env !== "production" ? "-recette" : ""
  }.apprentissage.beta.gouv.fr/api/appointment-request/context/create`;

  if (!training) {
    return null;
  }

  let response = null

  if (training?.id?.indexOf("test") >= 0) {
    response = {
      data: {
        cfd: "7777777",
        cle_ministere_educatif: "111111P11111140424210004242424464200115-44000#L01",
        code_postal: "44000",
        etablissement_formateur_entreprise_raison_sociale: "CONSERVATOIRE NATIONAL DES ARTS ET METIERS",
        etablissement_formateur_siret: "32439762900118",
        form_url: "https://rdv-cfa-recette.apprentissage.beta.gouv.fr/form?referrer=lba&cleMinistereEducatif=111111P11111140424210004242424464200115-44000%23L01",
        id_rco_formation: "21_115908|21_115908|105119",
        intitule_long: "TECHNICIEN(ENE) DEVELOPPEUR(EUSE) (CNAM)",
        lieu_formation_adresse: "25 boulevard Test Truc BP 31115",
        localite: "Nantes"
      }
    }
  } else {
    response = await _axios.post(
      prdvEndpoint,
      { referrer: "lba", idCleMinistereEducatif: training.id, idRcoFormation: training.idRcoFormation, trainingHasJob: !!hasAlsoJob },
      { headers: { "content-type": "application/json" } }
    );
  }


  if (response?.data?.error === "Prise de rendez-vous non disponible.") {
    return { error: "indisponible" };
  }

  const isAxiosError = !!_.get(response, "data.error");
  const isSimulatedError = _.includes(_.get(_window, "location.href", ""), "romeError=true");

  const isError = isAxiosError || isSimulatedError;

  if (isError) {
    if (isAxiosError) {
      _logError("PRDV API error", `Rome API error ${response.data.error}`);
    } else if (isSimulatedError) {
      _logError("PRDV API error simulated with a query param :)");
    }
  } else {
    // transformation des textes des diplômes
    res = response.data;
  }

  return res;
}
