import React from "react";
import logoLBA from "../../public/images/logo-noir-seul.svg";
import { push } from "connected-next-router";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LogoIdea.module.scss";
import { Button } from "reactstrap";

const LogoIdea = ({ showSearchForm }) => {
  const dispatch = useDispatch();

  const { widgetParameters } = useSelector((state) => state.trainings);

  const goToLbaHome = (e) => {
    if (widgetParameters) {
      let p = {
        type: "goToPage",
        page: widgetParameters && widgetParameters?.parameters?.returnURI ? widgetParameters.parameters.returnURI : "/",
      };
      if (typeof window !== "undefined") {
        window.parent.postMessage(p, "*");
      }
    } else {
      e.preventDefault();
      dispatch(push({ pathname: "/" }));
    }
  };

  return (
    <row className='d-none d-md-flex c-logo-idea py-2 pl-3'>
      <div>
        <a href="/" onClick={goToLbaHome}>
          <img
            src={
              widgetParameters && widgetParameters?.parameters?.returnLogoURL
                ? widgetParameters.parameters.returnLogoURL
                : logoLBA
            }
            alt="Retour page d'accueil de La Bonne Alternance"
          />
        </a>
      </div>
      <div className="ml-2">
        <h1 className={styles.h1}>Trouvez votre apprentissage</h1>
      </div>
    </row>
  );
};

export default LogoIdea;
