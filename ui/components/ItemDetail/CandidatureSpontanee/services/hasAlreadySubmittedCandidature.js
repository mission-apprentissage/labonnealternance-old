import { isString } from "lodash";

export default function hasAlreadySubmittedCandidature({
  applied = null,
  modal = false,
} = {}) {

  let actuallyApplied = isString(applied) && applied.indexOf('null') === -1

  return actuallyApplied && !modal

}
