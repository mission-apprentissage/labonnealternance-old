import React from "react";
import noop from "lodash";
import { WidgetHeader } from "components/WidgetHeader";
import lostCat from "public/images/lostCat.svg";

const NotFound = () => (
  <>
    <WidgetHeader handleSubmit={noop} />
    <img src={lostCat} alt="Chat perdu" />
    <div className='not-found'>
      <a href="https://labonnealternance.pole-emploi.fr" className="back">
        Retour à l'accueil
      </a>
    </div>
  </>
);

export default NotFound;
