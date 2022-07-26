import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

const stats2 = () => (
  <div>
    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="stats" label="Statistiques" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">Statistiques</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h3>Statistiques</h3>
          <p>
            La bonne alternance est une startup d’Etat incubée par beta.gouv. Nous développons un service à destination
            des publics selon les principes du{" "}
            <a href="https://beta.gouv.fr/approche/manifeste">Manifeste de beta.gouv</a>
          </p>
          <p>Nous mesurons l’impact de nos actions et publions en toute transparence nos statistiques :</p>
        </div>
      </div>
    </div>
    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div>
        <h3>Visitorat</h3>
        <iframe
        title="stats_plausible"
        className="c-stats-iframe c-stats-iframe__lba"
        plausible-embed
        src="https://plausible.io/share/labonnealternance.apprentissage.beta.gouv.fr?auth=Ck7r5NwNNf9IveZVA5U0O&embed=true&theme=light&background=transparent"
        loading="lazy"
        ></iframe>
      </div>
      <div>
        <h3>Offres La bonne alternance</h3>
      </div>
      <div>
        <h3>Part des formations présentant la prise de RDV</h3>
      </div>
      <div>
        <h3>Candidatures aux offres La bonne alternance</h3>
        <iframe
          title="stats_candidatures_offres_lba"
          className="c-stats-iframe c-stats-iframe__lba"
          src="https://labonnealternance.pole-emploi.fr/metabase/public/dashboard/9b0132ca-2629-4fa7-9be8-9183f2f7d98d"
          loading="lazy"
        />
      </div>
      <div>
        <h3>Demandes de RDV</h3>
      </div>
      <div>
        <h3>Taux de réponse aux candidatures (offres La bonne alternance, offres Pôle emploi et candidatures spontanées)</h3>
        <iframe
          title="stats_taux_reponse_candidatures"
          className="c-stats-iframe c-stats-iframe__lba"
          src="https://labonnealternance.pole-emploi.fr/metabase/public/dashboard/7f66e10d-0f1a-4839-b905-09aac03750dc"
          loading="lazy"
        />
      </div>
      <div>
        <h3>Taux de réponse aux demandes de RDV</h3>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default stats2;
