import { isString } from "lodash";

export default function hasAlreadySubmittedCandidature({
  applied = null,
  modal = false,
} = {}) {

  let actuallyApplied = isString(applied) && applied !== 'null'

  return actuallyApplied && !modal

}
