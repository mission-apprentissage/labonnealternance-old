import {noop} from "lodash/noop";


export default async function onInputValueChangeService(inputValue, inputItems = [], items = [], setInputItems = noop, selectItem = noop, onInputValueChangeFunction = null, compareItemFunction = null) {

  // fixe la liste d'items en fonction de la valeur courante du champ input. S'il y a appel à une API c'est ici
  if (onInputValueChangeFunction) {
    const newItems = await onInputValueChangeFunction(inputValue);
    setInputItems(newItems);
  } else {
    setInputItems(items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())));
  }

  // sélectionne ou désélectionne l'objet en fonction des modifications au clavier de l'utilisateur
  if (compareItemFunction) {
    const itemIndex = compareItemFunction(inputItems, inputValue);
    if (itemIndex >= 0) {
      selectItem(inputItems[itemIndex]);
    } else {
      selectItem(null);
    }
  }

};
