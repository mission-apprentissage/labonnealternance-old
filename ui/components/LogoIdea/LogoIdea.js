import React from "react";
import logoLBA from "../../public/images/logo-noir-seul.svg";
import { push } from "connected-next-router";
import { useDispatch, useSelector } from "react-redux";

const LogoIdea = () => {
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
    <div className="mr-4">
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
  );
};

export default LogoIdea;
