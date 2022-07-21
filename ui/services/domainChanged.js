import fetchRomes from "../services/fetchRomes";
import { SendPlausibleEvent } from "../utils/plausible";

export default async function domainChanged(val, setDomainErrorFunc) {
  const res = await fetchRomes(val, () => {
    setDomainErrorFunc(true);
  });

  if (res === "cancelled") {
    return [];
  }

  // tracking des recherches sur table domaines métier que lorsque le mot recherché fait au moins trois caractères
  if (val && val.length > 2) {
    if (res.length) {
      SendPlausibleEvent("Mots clefs les plus recherchés", { terme: val.toLowerCase(), hits: res.length });
    } else {
      SendPlausibleEvent("Mots clefs ne retournant aucun résultat", { terme: val.toLowerCase() });
    }
  }

  return res;
}
