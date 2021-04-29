import fetchRomes from "services/fetchRomes";
import { SendTrackEvent } from "utils/gtm";

export default async function domainChanged(val, setDomainErrorFunc) {
  const res = await fetchRomes(val, () => {
    setDomainErrorFunc(true);
  });

  if (val.length > 2) {
    SendTrackEvent({
      event: "Moteur de recherche - Metier",
      terme: val,
      hits: res.length,
    });
  }

  return res;
}
