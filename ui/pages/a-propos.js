import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";
const APROPOS = () => (
  <div>
    <ScrollToTop />
    <Navigation />

    <Breadcrumb forPage="a-propos" label="A propos" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-1">A propos de</span>
            <span className="d-block c-page-title is-color-2">La Bonne Alternance</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h3>Le saviez-vous ?</h3>
          <p>
            7 employeurs sur 10 recrutent sans déposer d’offre d’emploi.
            <br />
            Il est essentiel dans votre recherche de proposer votre candidature à des entreprises n’ayant pas forcément
            déposé d’offre d’emploi en alternance.
          </p>
          <p>
            Notre algorithme La Bonne Alternance analyse les offres et les recrutements des 6 dernières années pour vous
            proposer les entreprises qui recrutent régulièrement en alternance (contrat d'apprentissage ou contrat de
            professionnalisation).
          </p>

          <p>En complément, le service La Bonne Alternance expose les formations disponibles en apprentissage.</p>

          <p>
            Pour une meilleure lisibilité, les résultats sont affichés sur une carte et en liste.
            <br />
            En cliquant sur une entreprise, vous accédez à sa description, ses coordonnées lorsqu’elles sont
            disponibles, ainsi qu’à des conseils pour postuler.
          </p>

          <h3>Qui sommes-nous ?</h3>

          <p>
            La Bonne Alternance est d’abord une start-up interne de Pôle emploi créée et développée par des conseillers.{" "}
            <br />
            Reprise par la{" "}
            <a href="https://mission-apprentissage.gitbook.io/general/" rel="nooepener noreferrer" target="_blank">
              Mission apprentissage
            </a>{" "}
            en 2020, le site ajoute désormais des informations sur les formations et les offres d’emploi en
            apprentissage.
          </p>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default APROPOS;
