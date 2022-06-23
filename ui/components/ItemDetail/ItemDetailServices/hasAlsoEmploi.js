import { isNonEmptyString } from "../../../utils/strutils";


export default function hasAlsoEmploi({ isCfa = false, company = {}, searchedMatchaJobs = [], printall = false }) {
  let hasEtablissementFormateurSiret = false
  let hasEtablissementGestionnaireSiret = false
  let matchaSirets = searchedMatchaJobs.map((matcha) => matcha?.company?.siret)
  let nonEmptyMatchaSirets = matchaSirets.filter(isNonEmptyString)
  if (printall) console.log('nonEmptyMatchaSirets', nonEmptyMatchaSirets) ;
  if (printall) console.log('isNonEmptyString(company?.siret)', isNonEmptyString(company?.siret)) ;
  
  if (nonEmptyMatchaSirets.length > 0 && isNonEmptyString(company?.siret)) {
    hasEtablissementFormateurSiret = nonEmptyMatchaSirets.includes(company?.siret)
  }
  if (nonEmptyMatchaSirets.length > 0 && isNonEmptyString(company?.headquarter?.siret)) {
    hasEtablissementGestionnaireSiret = nonEmptyMatchaSirets.includes(company?.headquarter?.siret)
  }

  return isCfa || hasEtablissementFormateurSiret || hasEtablissementGestionnaireSiret
}
