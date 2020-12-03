import React from "react";
import { Link } from "react-router-dom";
import peopleIcon from "../../public/images/icons/searchingPeople.svg";
import errorAlertIcon from "../../public/images/icons/errorAlert.svg";

import styles from "./notFound.module.scss";


const NotFound = () => (
  <div className={styles.root}>
    <div className={styles.error}>
      <img src={peopleIcon} alt="" />
      <div id="error-text">
        <span className={styles.span}>404</span>
        <h1 className={styles.h1}>PAGE INCONNUE !</h1>
        <div className={styles.errorMessage}>
          <img src={errorAlertIcon} alt="" className={styles.errorImg}/>
          Aucun contenu ne correspond à cette adresse
        </div>
      </div>

      <a href="https://labonnealternance.pole-emploi.fr" className="back">
        Retour à l'accueil
      </a>
    </div>
  </div>
);

export default NotFound;
