import { includes, random } from "lodash";

// L'inverse de "includes". S'appui sur lodash pour plus de compatibilité.
const amongst = (item, collection) => {
  return includes(collection, item);
};

const randomWithin = (collection) => {
  let randomIndex = random(0, collection.length - 1)
  return collection[randomIndex]
}

export { amongst, randomWithin }
