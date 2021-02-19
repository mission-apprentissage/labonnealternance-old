import fetchRomes from "services/fetchRomes";

export default async function (val, setDomainErrorFunc) {
  const res = await fetchRomes(val, () => {
    setDomainErrorFunc(true);
  });
  return res;
};
