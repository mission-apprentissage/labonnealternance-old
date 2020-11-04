import React from "react";
import "./errorMessage.css";
import errorAlertIcon from "../../assets/icons/errorAlert.svg";
import searchingPeople from "../../assets/icons/searchingPeople.svg";

const ErrorMessage = ({ type, message }) => {
  return (
    <>
      {type === "column" ? <img src={searchingPeople} alt="" /> : ""}
      <div className="errorMessage">
        <img src={errorAlertIcon} alt="" />
        {message}
      </div>
      {type === "column" ? (
        <div className="dontPanic">
          <h3>
            Pas de panique <span className="orange">!</span>
          </h3>
          Il y a forcément un résultat qui vous attend, veuillez revenir ultérieurement
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ErrorMessage;
