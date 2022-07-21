/* eslint-disable prettier/prettier */
import fetchRomes from "../services/fetchRomes";
import { SendPlausibleEvent } from "../utils/gtm";

export default async function domainChanged(val, setDomainErrorFunc) {
  const res = await fetchRomes(val, () => {
    setDomainErrorFunc(true);
  });

  // tracking des recherches sur table domaines métier que lorsque le mot recherché fait au moins trois caractères
  if (val && val.length > 2) {
    SendPlausibleEvent("Moteur de recherche - Metier",{terme:val, hits: res.length});
  }

  return res;
}
