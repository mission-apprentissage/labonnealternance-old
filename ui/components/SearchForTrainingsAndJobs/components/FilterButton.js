import React from "react";
import ReactHtmlParser from "react-html-parser";
import { capitalizeFirstLetter } from "../../../utils/strutils";


const FilterButton = ({ type, count, isActive, handleFilterButtonClicked }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isActive) handleFilterButtonClicked(type);
  };

  const getText = () => {
    let res = "";
    if (type === "trainings") {
      res = "Les formations";
    } else if (type === "jobs") {
      res = "Les entreprises";
    } else if (type === "all") {
      res = "";
    }
    return res;
  };

  return (
    <button
      onClick={handleClick}
      className={`gtmFilterButton gtmFilterButton${capitalizeFirstLetter(type)} c-filterbutton c-filterbutton--${type} ${isActive ? "is-active" : ""}`}
    >
      {ReactHtmlParser(getText())}
    </button>
  );
};

export default FilterButton;
