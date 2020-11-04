import React, { useState } from "react";
import { useFormikContext } from "formik";
import { useCombobox } from "downshift";
import "./AutoCompleteField.css";

export const AutoCompleteField = ({
  itemToStringFunction,
  onInputValueChangeFunction,
  onSelectedItemChangeFunction,
  compareItemFunction,
  initialItem,
  items,
  initialIsOpen,
  scrollParentId,
  ...props
}) => {

  const { setFieldValue } = useFormikContext();

  const [inputItems, setInputItems] = useState(items);

  const itemToString = (item) => {
    if (itemToStringFunction) return item ? itemToStringFunction(item) : "";
    else return item;
  };

  // hack pour scroller un champ autocomplete dont les valeurs pourraient être cachées par le clavier du mobile
  const onFocus = (e) => {
    let ancestor = e.currentTarget.closest(`#${scrollParentId}`);

    if (ancestor) {
      setTimeout(() => {
        if (window.innerHeight < 650) ancestor.scrollTop = ancestor.scrollTop + 150;
      }, 350);
    }
  };

  const {
    isOpen,
    /*getToggleButtonProps,
    getLabelProps,*/
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    inputValue,
  } = useCombobox({
    items: inputItems,
    itemToString,
    initialSelectedItem: initialItem,
    initialIsOpen,
    onSelectedItemChange: ({ selectedItem }) => {
      // modifie les valeurs sélectionnées du formulaire en fonction de l'item sélectionné
      if (onSelectedItemChangeFunction) onSelectedItemChangeFunction(selectedItem, setFieldValue);
    },
    onInputValueChange: async ({ inputValue }) => {
      // fixe la liste d'items en fonction de la valeur courante du champ input. S'il y a appel à une API c'est ici

      if (onInputValueChangeFunction) {
        const newItems = await onInputValueChangeFunction(inputValue);
        setInputItems(newItems);
      } else setInputItems(items.filter((item) => item.label.toLowerCase().startsWith(inputValue.toLowerCase())));
      
      // sélectionne ou désélectionne l'objet en fonction des modifications au clavier de l'utilisateur
      if (compareItemFunction) {
        const itemIndex = compareItemFunction(inputItems, inputValue);

        if (itemIndex >= 0)
          selectItem(inputItems[itemIndex]);
        else selectItem(null);                
      }
    },
  });

  return (
    <div className="autoCompleteContainer">
      {/*<label {...getLabelProps()}>Possibilité de poser un label avec des props dédiées</label>*/}
      <div {...getComboboxProps()}>
        <input
          {...getInputProps()}
          className={inputValue && inputValue.length > 20 ? "autoCompleteSmallFont" : ""}
          placeholder={props.placeholder}
          onFocus={onFocus}
          name={props.name}
        />
        {/*<button {...getToggleButtonProps()} aria-label="toggle menu">
          &#8595;   possibilité de poser un bouton toggle avec des props dédiées
        </button>*/}
      </div>
      <ul {...getMenuProps()} className="autoCompleteMenu">
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={highlightedIndex === index ? "highlightedMenuItem" : ""}
              key={`${index}`}
              {...getItemProps({ item: item.label, index })}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AutoCompleteField;
