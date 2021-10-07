import postCandidature from "services/postCandidature";
import extractCompanyValues from "services/extractCompanyValues";
import { noop } from "lodash/noop";

export default async function submitCandidature(applicantValues, setSendingState=noop, item={}) {
  setSendingState('currently_sending')
  let success = true

  try {
    await postCandidature(applicantValues, extractCompanyValues(item));
  } catch (error) {
    success = false
  }

  if (success) {
    setSendingState('ok_sent')
  } else {
    setSendingState('not_sent_because_of_errors')
  }

}
