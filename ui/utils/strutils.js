import _ from 'lodash'

const isNonEmptyString = (val) => _.isString(val) && val.trim().length > 0;
const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export { isNonEmptyString, capitalizeFirstLetter };
