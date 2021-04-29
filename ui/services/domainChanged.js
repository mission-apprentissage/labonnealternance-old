import fetchRomes from "services/fetchRomes";
import { SendTrackEvent } from "utils/gtm";

export default async function domainChanged(val, setDomainErrorFunc) {
  const res = await fetchRomes(val, () => {
    setDomainErrorFunc(true);
  });

  if (val.length > 2) {
    SendTrackEvent({
      action: "Custom event",
      label: val,
      category: "Moteur de recherche - Metier",
      value: res.length,
    });
  }

  return res;
}
