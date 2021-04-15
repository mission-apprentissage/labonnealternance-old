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
            <span className="d-block c-page-title is-color-2">Politique de confidentialité</span>
            <span className="d-block c-page-title is-color-2">La Bonne Alternance</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h2 class="h3">Traitement des données à caractère personnel</h2>
          <p>
            <span className="d-block">Le présent site La Bonne Alternance est à l’initiative de Pôle emploi, qui est responsable de traitement :</span>
            <span className="d-block">Pôle emploi</span>
            <span className="d-block">1-5 rue du docteur Gley</span>
            <span className="d-block">75987 Paris cedex 20</span>
          </p>

          <h2 class="h3">Finalité</h2>
          <p>
            <span className="d-block">Le site « La Bonne Alternance » vise à faciliter les entrées en alternance des usagers en informant sur les formations en apprentissage ainsi que les offres d’emplois et entreprises auprès desquelles adresser une candidature. Le traitement de données a donc pour finalité de fournir, sur requête de l’utilisateur, des résultats de recherche pertinents correspondant aux attentes de l’usager.</span>
          </p>
          
          <h2 class="h3">Données à caractère personnel traitées</h2>
          <p>
            <span className="d-block">Sont traitées les données suivantes :</span>
            <ul>
              <li>domaine/métier/formation envisagé ;</li>
              <li>niveau de diplôme souhaité ;</li>
              <li>périmètre géographique de recherche ;</li>
              <li>coordonnées des interlocuteurs physiques des entreprises ;</li>
              <li>données de connexion (et notamment, les identifiants de connexion, nature des opérations, date et heure de l’opération) ;</li>
              <li>cookies.</li>
            </ul>
          </p>
          
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default RGPD;
