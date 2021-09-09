import _ from "lodash";
import { isNonEmptyString, countInstances } from "./strutils";

/*
* Permet de ne retenir QUE l'adresse postale,
* sans le nom du destinataire.
*
* Exemple : Service Ressource Humaine, 2 rue Truc, 32300 Mouches
* Devient : 2 rue Truc, 32300 Mouches
*/
const rawPostalAddress = (address) => {
  let result = ''
  if (isNonEmptyString(address)) {
    if (countInstances(address, ' ,') > 1) {
      let elements = address.split(' ,');
      elements.shift() // Retire le premier élément : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
      result = elements.join()
    }
  }
  console.log('result', result);
  return result;
}

export { rawPostalAddress };
