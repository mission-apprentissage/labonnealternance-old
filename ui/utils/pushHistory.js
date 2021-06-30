import { getItemQueryParameters } from "utils/getItemId";
import { getSearchQueryParameters } from "utils/getSearchParameters";

const pushHistory = ({ router, scopeContext, item, page, display, searchParameters, searchTimestamp, isReplace }) => {
  let params = `${display ? `&display=${display}` : ""}${page ? `&page=${page}` : ""}${
    item ? `&${getItemQueryParameters(item)}` : ""
  }${searchParameters ? `&${getSearchQueryParameters(searchParameters)}` : ""}${
    searchTimestamp ? `&s=${searchTimestamp}` : ""
  }`;

  if (!isReplace) {
    router.push(`${scopeContext.path}${params ? `?${params}` : ""}`, undefined, {
      shallow: true,
    });
  } else {
    router.replace(`${scopeContext.path}${params ? `?${params}` : ""}`, undefined, {
      shallow: true,
    });
  }
};

/**
 * 
voir dans l'historique la récup des paramètres pour mise à jour de l'interface formulaire et des résutlats


*AjOUTER UN router.replace avcec même signature ci dessus

dérouler les positionnements de chaque history push et history replace



 */

export default pushHistory;
