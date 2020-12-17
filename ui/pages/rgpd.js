import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";
const RGPD = () => (
  <div>
    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="rgpd" label="RGPD" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">RGPD</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h3>Politique de confidentialité et utilisation de vos données personnelles</h3>
          <p>La Bonne Alternance dépose des cookies nécessaires au bon fonctionnement du site:</p>

          <ul>
            <li>
              Des cookies anonymes de mesure d'usage via le site Google Analytics. Comme des informations sur votre
              support informatique (catégorie d’appareil, système d’exploitation, navigateur), ou votre navigation
              (méthode d’accès à notre site, durée de votre visite).
              <br />
              Ces cookies nous permettent de mesurer les usages du site La bonne alternance, afin de l’améliorer.
            </li>
            <li>
              Des cookies anonymes liés à la réalisation d’enquêtes et analyses via l’outil Hotjar.
              <br />
              Ces cookies nous permettent d’identifier les usagers ayant déjà répondu à une enquête, afin de ne plus les
              solliciter sur le sujet.
            </li>

            <li>
              Des cookies spécifiques à l’outil La bonne alternance.
              <br />
              Ces cookies permettent l'enregistrement de vos préférences ou de l'état de votre interface
            </li>
          </ul>

          <p>
            Toutes ces informations ont pour but d'assurer le bon fonctionnement du site et nous permettent également
            d'améliorer l'intérêt et l'ergonomie de nos services.
          </p>

          <p>Notre service s’engage à ne pas communiquer vos données personnelles à des organismes tiers.</p>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default RGPD;
