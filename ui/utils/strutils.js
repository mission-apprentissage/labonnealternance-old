import _ from "lodash";

const isNonEmptyString = (val) => _.isString(val) && val.trim().length > 0;
const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const formatDate = (d) => {
  let resultDate = "";

  try {
    resultDate = new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch (err) {}

  return resultDate;
};

export { isNonEmptyString, capitalizeFirstLetter, formatDate };
