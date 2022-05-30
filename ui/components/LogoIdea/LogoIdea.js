import React from "react";
import logoLBA from "../../public/images/logo-noir-seul.svg";
//import { push } from "connected-next-router";
//import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ParameterContext } from "../../context/ParameterContextProvider";

const LogoIdea = () => {
  //const dispatch = useDispatch();
  const router = useRouter();

  const { widgetParameters } = React.useContext(ParameterContext);

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
      //dispatch(push({ pathname: "/" }));
      router.push("/");
    }
  };

  return (
    <div className="mr-4 c-logoheader">
      <a href="/" onClick={goToLbaHome} className="ml-3">
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
