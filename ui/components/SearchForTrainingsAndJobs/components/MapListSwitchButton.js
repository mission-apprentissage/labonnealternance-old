import React from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const MapListSwitchButton = ({ showResultMap, showSearchForm, showResultList }) => {

  const { visiblePane, hasSearch } = useSelector((state) => state.trainings);

  if (visiblePane === "resultList") {
    if (hasSearch)
      return (
        <div className="floatingButtons resultList">
          <Button onClick={showResultMap}>
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.83329 3.85131V12.935L5.421 11.3979L9.671 13.5229L13.1666 12.0234V2.94039L14.0896 2.54514C14.1435 2.52204 14.2023 2.51268 14.2607 2.5179C14.3191 2.52313 14.3753 2.54277 14.4242 2.57507C14.4732 2.60737 14.5133 2.65131 14.5411 2.70296C14.5688 2.75461 14.5833 2.81234 14.5833 2.87098V12.9584L9.62496 15.0834L5.37496 12.9584L0.910334 14.8716C0.85644 14.8947 0.797652 14.904 0.739248 14.8988C0.680843 14.8936 0.624649 14.8739 0.575709 14.8416C0.526768 14.8093 0.486613 14.7654 0.458848 14.7137C0.431082 14.6621 0.416574 14.6044 0.416626 14.5457V4.45835L1.83329 3.85131ZM10.5054 7.46381L7.49996 10.4686L4.4945 7.46381C3.9002 6.86941 3.4955 6.11213 3.33157 5.28773C3.16764 4.46333 3.25185 3.60884 3.57354 2.83229C3.89523 2.05575 4.43997 1.39203 5.13886 0.925066C5.83775 0.458102 6.65942 0.208862 7.49996 0.208862C8.3405 0.208862 9.16216 0.458102 9.86106 0.925066C10.56 1.39203 11.1047 2.05575 11.4264 2.83229C11.7481 3.60884 11.8323 4.46333 11.6683 5.28773C11.5044 6.11213 11.0997 6.86941 10.5054 7.46381ZM7.49996 8.46539L9.50313 6.46152C9.89946 6.0653 10.1694 5.56045 10.2788 5.01082C10.3882 4.46118 10.3321 3.89145 10.1177 3.37368C9.90328 2.8559 9.54012 2.41335 9.07416 2.10198C8.60821 1.79061 8.06038 1.62441 7.49996 1.62441C6.93954 1.62441 6.39171 1.79061 5.92575 2.10198C5.4598 2.41335 5.09664 2.8559 4.88222 3.37368C4.6678 3.89145 4.61174 4.46118 4.72113 5.01082C4.83052 5.56045 5.10046 6.0653 5.49679 6.46152L7.49996 8.46539Z" fill="white" />
            </svg>
            <span className="ml-2 c-resultlist-card">
              Carte
            </span>
          </Button>
        </div>
      );
    else return "";
  } else {
    return (
      <div className="floatingButtons resultMap">
        <Button onClick={showSearchForm}>Filtres</Button>
        {hasSearch ? <Button onClick={showResultList}>Liste</Button> : ""}
      </div>
    );
  }
};

export default MapListSwitchButton;
