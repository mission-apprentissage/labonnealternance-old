import { getItemQueryParameters } from "utils/getItemId";
import { getSearchQueryParameters } from "utils/getSearchParameters";
import { getCampaignParameters } from "utils/campaignParameters";

const pushHistory = ({ router, scopeContext, item, page, display, searchParameters }) => {
  let params = `${display ? `&display=${display}` : ""}${page ? `&page=${page}` : ""}${
    item ? `&${getItemQueryParameters(item)}` : ""
  }${searchParameters ? `&${getSearchQueryParameters(searchParameters)}` : ""}${getCampaignParameters()}`;

  router.push(`${scopeContext.path}${params ? `?${params}` : ""}`, undefined, {
    shallow: true,
  });
};

export default pushHistory;
