import { isNonEmptyString } from "../../../utils/strutils";


export default function hasAlsoEmploi({ isCfa = false, company = {}, searchedMatchaJobs = [] }) {
  let hasEtablissementFormateurSiret = false
  let hasEtablissementGestionnaireSiret = false
  let currentSiret = company?.siret
  console.log('currentSiret', currentSiret);
  console.log('company', company);
  console.log('searchedMatchaJobs', searchedMatchaJobs);
  let matchaSirets = searchedMatchaJobs.map((matcha) => matcha?.company?.siret)
  console.log('matchaSirets', matchaSirets);
  let nonEmptyMatchaSirets = matchaSirets.filter(isNonEmptyString)
  console.log('nonEmptyMatchaSirets', nonEmptyMatchaSirets);
  if (nonEmptyMatchaSirets.length > 0 && isNonEmptyString(currentSiret)) {
    hasEtablissementFormateurSiret = nonEmptyMatchaSirets.includes(currentSiret)
    console.log('hasEtablissementFormateurSiret', hasEtablissementFormateurSiret);
  }
  if (nonEmptyMatchaSirets.length > 0 && isNonEmptyString(currentSiret)) {
    hasEtablissementGestionnaireSiret = nonEmptyMatchaSirets.includes(company?.headquarter?.siret)
    console.log('hasEtablissementGestionnaireSiret', hasEtablissementGestionnaireSiret);
  }
  console.log('isCfa', isCfa);
  return isCfa || hasEtablissementFormateurSiret || hasEtablissementGestionnaireSiret
}
