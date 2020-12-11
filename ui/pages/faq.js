import React from "react";
import Navigation from "components/navigation";

import Footer from "components/footer";
const FAQ = () => (
  <div>
    <Navigation />
      <div className="container c-page-container">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Questions</span>
              <span className="d-block c-page-title is-color-2">fréquemment</span>
              <span className="d-block">posées</span>
            </h1>
            <hr className="c-page-title-separator"/>
          </div>
          <div className="col-12 col-md-7">
            <h2 className="c-faq-question">Il manque des entreprises dans la liste.</h2>
            <p className="c-faq-answer">La Bonne Alternance est bien plus qu’un simple annuaire. La Bonne Alternance effectue un ciblage spécifique des entreprises à fort potentiel d’embauche afin de vous faire gagner du temps dans la sélection des entreprises à démarcher. Toutes les entreprises ne sont donc pas indiquées.</p>
          </div>
        </div>
      </div>
    <Footer />
  </div>
);

export default FAQ;
