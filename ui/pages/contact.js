import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import { NextSeo } from "next-seo";

import Footer from "components/footer";

const contact = () => (
  <div>
    <NextSeo
      title="Contact | La Bonne Alternance | Trouvez votre alternance"
      description="Une remarque, un avis, une suggestion d’amélioration ? Contactez-nous !"
    />
    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="contact" label="Contact" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">Contact</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h3>Nous contacter</h3>
          <p>
            Une remarque, un avis, une suggestion d’amélioration ?
            <a href="mailto:labonnealternance@pole-emploi.fr"> Contactez-nous !</a>
          </p>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default contact;
