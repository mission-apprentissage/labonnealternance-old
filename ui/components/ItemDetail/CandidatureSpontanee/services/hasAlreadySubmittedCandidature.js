export default function hasAlreadySubmittedCandidature({
  applied = null,
  modal = false,
} = {}) {

  return !!JSON.parse(applied) && !modal
  
}
