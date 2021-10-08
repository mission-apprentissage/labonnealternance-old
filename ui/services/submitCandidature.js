import postCandidature from "../services/postCandidature.js";
import extractCompanyValues from "../services/extractCompanyValues.js";

export default async function submitCandidature(
  applicantValues, 
  setSendingState=()=>{}, 
  item={},
  _postCandidature = postCandidature,
  _extractCompanyValues = extractCompanyValues
  ) {

    
  setSendingState('currently_sending')
  let success = true

  try {
    await _postCandidature(applicantValues, _extractCompanyValues(item));
  } catch (error) {
    console.log('error', error);
    success = false
  }

  if (success) {
    setSendingState('ok_sent')
  } else {
    setSendingState('not_sent_because_of_errors')
  }

}
