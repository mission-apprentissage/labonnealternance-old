import React from "react";
import trainingIcon from "../../../public/images/icons/book_small.svg";
import jobIcon from "../../../public/images/icons/job_small.svg";
import ReactHtmlParser from "react-html-parser";
import { capitalizeFirstLetter } from "../../../utils/strutils";

const FilterButton = ({ type, count, isActive, handleFilterButtonClicked }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isActive) handleFilterButtonClicked(type);
  };

  const getIcon = () => {
    let src = "";
    if (type === "trainings") {
      src = trainingIcon;
    } else if (type === "jobs") {
      src = jobIcon;
    }

    return src ? <img src={src} alt="" className="c-filterbutton-img" /> : "";
  };

  const getText = () => {
    let res = `${ count } `;
    if (type === "trainings") {
      res += "formation(s)&nbsp;";
    } else if (type === "jobs") {
      res += "entreprise(s)&nbsp;";
    } else if (type === "all") {
      res = "&nbsp;";
    }
    return res;
  };

  return (
    <button
      onClick={handleClick}
      className={`gtmFilterButton gtmFilterButton${capitalizeFirstLetter(type)} c-filterbutton c-filterbutton--${type} ${isActive ? "is-active" : ""}`}
    >
      {getIcon()}
      {ReactHtmlParser(getText())}
    </button>
  );
};

export default FilterButton;
