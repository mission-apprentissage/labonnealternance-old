import { getItemQueryParameters } from "utils/getItemId";

const pushHistory = ({ router, scopeContext, item, page, display }) => {
  let params = `${display ? `&display=${display}` : ""}${page ? `&page=${page}` : ""}${
    item ? `&${getItemQueryParameters(item)}` : ""
  }`;

  router.push(`${scopeContext.path}${params ? `?${params}` : ""}`, undefined, {
    shallow: true,
  });
};

export default pushHistory;
