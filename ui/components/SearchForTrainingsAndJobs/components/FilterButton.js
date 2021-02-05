import React from "react";
import trainingIcon from "../../../public/images/icons/book_small.svg";
import jobIcon from "../../../public/images/icons/job_small.svg";
import ReactHtmlParser from "react-html-parser";

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

    return src ? <img src={src} alt="" /> : "";
  };

  const getText = () => {
    if (type === "all") return "Voir tout";

    return `${count} ${type === "trainings" ? "formations&nbsp;" : "entreprises&nbsp;"}`;
  };

  return (
    <button
      onClick={handleClick}
      className={`gtmFilterButton gtmFilterButton${type} filterButton${type}${isActive ? " active" : ""}`}
    >
      {getIcon()}
      {ReactHtmlParser(getText())}
    </button>
  );
};

export default FilterButton;
