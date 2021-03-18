import React from "react";
import noop from "lodash";
import { WidgetHeader } from "components/WidgetHeader";
import Footer from "components/footer";
import lostCat from "public/images/lostCat.svg";

const NotFound = () => (
  <>

    <div className="not-found-container">
      <div className="not-found-header">
        <WidgetHeader handleSubmit={noop} />
      </div>
      <div className="not-found-content-container">
        <div className="not-found-content">
          <div className="row">
            <div className="col-12 col-lg-6 order-lg-2">
              <img src={lostCat} alt="Chat perdu" />
            </div>
            <div className="col-12 col-lg-6 order-lg-1">
              <div className='not-found'>
                <a href="https://labonnealternance.pole-emploi.fr" className="back">
                  Retour à l'accueil
            </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="not-found-footer">
        <Footer />
      </div>
    </div>


  </>
);

export default NotFound;
