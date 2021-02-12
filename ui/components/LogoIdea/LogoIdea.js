import React from "react";
import logoLBA from "../../public/images/logo-noir-seul.svg";
import { push } from "connected-next-router";
import { useDispatch, useSelector } from "react-redux";
import LogoBar from "./LogoBar";

import { Row, Col } from "reactstrap";

const LogoIdea = ({ showSearchForm, showResultList }) => {
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
    <>
      <div className="pt-2">
        <Row className='d-md-none'>
          <Col xs="3">
            <a href="/" onClick={goToLbaHome} className="ml-3">
              <img
                src={logoLBA}
                alt="Retour page d'accueil de La Bonne Alternance"
                />
            </a>
          </Col>
          <Col xs="6">
            <div className="d-flex align-items-center">
              <h1 className="c-logoidea-title">Trouvez votre apprentissage</h1>
            </div>
          </Col>
          <Col xs="3">
            <button className="blueButton filterButton mr-3" onClick={showSearchForm}>
              <span className="hiddenSM"> Filtres</span>
            </button>
          </Col>
        </Row >
        <Row className='d-none d-md-flex c-logo-idea py-2 pl-3'>
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
          <div className="ml-4">
            <LogoBar/>
          </div>
        </Row>
      </div>
    </>
  );
};

export default LogoIdea;
