import React from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import { NextSeo } from "next-seo";

import Footer from "components/footer";
import ExternalLink from "@/components/externalLink";

const Organisme = (props) => {
  return (
    <div>
      <NextSeo
        title="Organisme de formation | La Bonne Alternance | Trouvez votre alternance"
        description="Comment référencer ma formation ? Nous sommes là pour vous aider."
      />

      <Navigation bgcolor="is-white" />

      <Breadcrumb forPage="organisme-de-formation" label="Organisme de formation" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Comment</span>
              <span className="d-block c-page-title is-color-1">
                référencer <span className="c-page-title is-color-2">ma </span>
              </span>
              <span className="d-block c-page-title is-color-2">formation ?</span>
            </h1>
            <hr className="c-page-title-separator" align="left" />
          </div>
          <div className="col-12 col-md-7">
            <p>La Bonne Alternance expose des données provenant du réseau Carif-oref.</p>
            <p>Pour référencer votre formation, rendez-vous sur le site du Carif-Oref :</p>
            <p className="c-organisme-link">
              <img className="mt-n1 mr-2" src="/images/square_link.svg" alt="Lien relancer son offre de formation" />
              <ExternalLink
                url="https://reseau.intercariforef.org/referencer-son-offre-de-formation"
                title="https://reseau.intercariforef.org/referencer-son-offre-de-formation."
              />
            </p>
            <p>
              Veuillez noter que pour le moment, seules les formations en apprentissage sont référencées sur La Bonne
              Alternance.
            </p>
            <div className="text-center">
              <p className="c-organisme-help">Vous êtes perdu(e) ? Nous sommes là pour vous aider.</p>
              <a className="c-organisme-contact-link" href="mailto:labonnealternance@apprentissage.beta.gouv.fr">
                Contacter notre service support
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">&nbsp;</div>
      <Footer />
    </div>
  );
};
export default Organisme;
