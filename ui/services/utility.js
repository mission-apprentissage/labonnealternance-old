import { includes } from "lodash";

// indique l'attribut de l'objet contenant le texte de l'item sélectionné à afficher
const amongst = (item, collection) => {
  return includes(collection, item);
};

export { amongst }
