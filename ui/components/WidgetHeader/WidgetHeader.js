import React from "react";
import logoLBA from "public/images/logo-noir-seul.svg";
import { push } from "connected-next-router";
import { useDispatch, useSelector } from "react-redux";
import LogoBar from "components/LogoIdea/LogoBar";

import { Row, Col } from "reactstrap";

const WidgetHeader = ({ showSearchForm, showResultList }) => {
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
      <div className="c-widgetheader container container-fluid pt-2">
        <Row className="d-none d-md-flex c-logo-idea py-2 pl-3">
          <div>
            <a href="/" onClick={goToLbaHome} className="ml-3 d-none d-lg-inline">
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
            <LogoBar />
          </div>
        </Row>
      </div>
    </>
  );
};

export default WidgetHeader;
