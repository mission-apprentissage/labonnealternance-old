import { isString } from 'lodash'

const isNonEmptyString = (val) => isString(val) && val.trim().length > 0

export { isNonEmptyString };
