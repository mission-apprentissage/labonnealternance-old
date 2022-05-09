import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

const stats = () => (
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
            La Bonne Alternance est une startup d’Etat incubée par beta.gouv. Nous développons un service à destination
            des publics selon les principes du{" "}
            <a href="https://beta.gouv.fr/approche/manifeste">Manifeste de beta.gouv</a>
          </p>
          <p>Nous mesurons l’impact de nos actions et publions en toute transparence nos statistiques :</p>
        </div>
      </div>
    </div>
    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div>
        <iframe
          className="c-stats-iframe"
          title="stats_matcha"
          src="https://matcha.apprentissage.beta.gouv.fr/metabase/public/dashboard/404744cc-61aa-41df-983c-bdee1e992543"
        />
      </div>
      <div>
        <iframe
          title="stats_lba"
          className="c-stats-iframe c-stats-iframe__lba"
          src="https://labonnealternance.apprentissage.beta.gouv.fr/metabase/public/dashboard/fead16ad-b526-4e30-861b-f8967eb17f93"
        />
      </div>

      <div>
        <iframe
          title="stats_lba_plausible"
          className="c-stats-iframe c-stats-iframe__lba"
          plausible-embed
          src="https://plausible.io/share/labonnealternance.apprentissage.beta.gouv.fr?auth=Ck7r5NwNNf9IveZVA5U0O&embed=true&theme=light&background=transparent"
          loading="lazy"
        ></iframe>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default stats;
