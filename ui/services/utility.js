import { includes } from "lodash";

// indique si un élément fait parti d'une collection.
// L'inverse de "includes". S'appui sur lodash pour plus de compatibilité.
const amongst = (item, collection) => {
  return includes(collection, item);
};

const isNonEmptyString = (x) => {
  return Object.prototype.toString.call(x) === "[object String]" && x.length > 0
};

export { amongst, isNonEmptyString }
