import React from "react";
import ReactHtmlParser from "react-html-parser";
import { capitalizeFirstLetter } from "../../../utils/strutils";


const FilterButton = ({ type, count, isActive, handleFilterButtonClicked }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isActive) handleFilterButtonClicked(type);
  };

  const getText = () => {
    let res = `<span class="c-filterbutton-count">${count} </span>`;
    if (type === "trainings") {
      res += `formation${count <= 1 ? '' : 's'}`;
    } else if (type === "jobs") {
      res += `entreprise${count <= 1 ? '' : 's'}`;
    } else if (type === "all") {
      res = "";
    }
    return res;
  };

  return (
    <button
      onClick={handleClick}
      className={`mb-2 gtmFilterButton gtmFilterButton${capitalizeFirstLetter(type)} c-filterbutton c-filterbutton--${type} ${isActive ? "is-active" : ""}`}
    >
      {ReactHtmlParser(getText())}
    </button>
  );
};

export default FilterButton;
