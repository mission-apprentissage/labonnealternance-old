export const getSearchQueryParameters = (searchParameters) => {
  let result = `job=${encodeURIComponent(
    searchParameters.job.label
  )}&romes=${searchParameters.job.romes.toString()}&diploma=${searchParameters.diploma}&radius=${
    searchParameters.radius
  }&lat=${searchParameters.location.value.coordinates[1]}&lon=${
    searchParameters.location.value.coordinates[0]
  }&zipcode=${searchParameters.location.zipcode}&insee=${searchParameters.location.insee}&address=${encodeURIComponent(
    searchParameters.location.label
  )}`;

  return result;
};
