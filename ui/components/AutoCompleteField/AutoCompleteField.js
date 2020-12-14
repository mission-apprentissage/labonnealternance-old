import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useCombobox } from "downshift";
import { debounce } from "lodash";
import onInputValueChangeService from "./onInputValueChangeService";

let debouncedOnInputValueChange = null;

export const AutoCompleteField = ({
  itemToStringFunction,
  onInputValueChangeFunction,
  onSelectedItemChangeFunction,
  compareItemFunction,
  initialItem,
  items,
  initialIsOpen,
  scrollParentId,
  previouslySelectedItem,
  illustration,
  ...props
}) => {
  useEffect(() => {
    if (!initialized && previouslySelectedItem) {
      setInitialized(true);
      onInputValueChangeService({
        inputValue,
        inputItems,
        items,
        setInputItems,
        selectItem,
        onInputValueChangeFunction,
        compareItemFunction,
        onSelectedItemChangeFunction,
        previouslySelectedItem,
        setFieldValue,
      });
    }
  }, []);

  const { setFieldValue } = useFormikContext();

  const [inputItems, setInputItems] = useState(items);
  const [initialized, setInitialized] = useState(false);

  const itemToString = (item) => {
    if (itemToStringFunction) return item ? itemToStringFunction(item) : "";
    else return item;
  };

  // hack pour scroller un champ autocomplete dont les valeurs pourraient être cachées par le clavier du mobile
  const onFocus = (e) => {
    let ancestor = e.currentTarget.closest(`#${scrollParentId}`);

    if (ancestor) {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          if (window.innerHeight < 650) ancestor.scrollTop = ancestor.scrollTop + 150;
        }
      }, 350);
    }
  };

  const {
    isOpen,
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
    initialSelectedItem: previouslySelectedItem,
    initialIsOpen,
    onSelectedItemChange: ({ selectedItem }) => {
      // modifie les valeurs sélectionnées du formulaire en fonction de l'item sélectionné
      if (onSelectedItemChangeFunction) {
        onSelectedItemChangeFunction(selectedItem, setFieldValue);
      }
    },
    onInputValueChange: async ({ inputValue }) => {
      if (!debouncedOnInputValueChange) {
        debouncedOnInputValueChange = debounce(onInputValueChangeService, 300);
      }
      debouncedOnInputValueChange({
        inputValue,
        inputItems,
        items,
        setInputItems,
        selectItem,
        onInputValueChangeFunction,
        compareItemFunction,
      });
    },
  });

  return (
    <div className="autoCompleteContainer">
      <div className={`c-input-work-container`} {...getComboboxProps()}>
        <input
          {...getInputProps()}
          className={`form-control form-control-lg w-100 c-input-work ${
            inputValue && inputValue.length > 20 ? "is-text-too-long" : "is-text-not-too-long"
          }`}
          placeholder={props.placeholder}
          onFocus={onFocus}
          name={props.name}
          aria-describedby="name"
        />
        {illustration && <img className="c-input-work-img" src={illustration} alt="" />}
      </div>
      <ul {...getMenuProps()} className="c-autocomplete__menu">
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={highlightedIndex === index ? "c-autocomplete__option--highlighted" : ""}
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
