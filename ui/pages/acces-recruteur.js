import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import Entreprise from "components/HomeComponents/Entreprise";
import PostezVotreOffre from "components/HomeComponents/PostezVotreOffre";
import OffresGratuites from "components/HomeComponents/OffresGratuites";
import OrganismesMandataires from "components/HomeComponents/OrganismesMandataires";
import GerezOffres from "components/HomeComponents/GerezOffres";
import AmeliorerLBA from "components/HomeComponents/AmeliorerLBA";
import PartenairesDeConfiance from "components/HomeComponents/PartenairesDeConfiance";

import { NextSeo } from "next-seo";

import Footer from "components/footer";

const AccesRecruteur = () => (
  <div>
    <NextSeo
      title="Acces recruteur | La Bonne Alternance | Trouvez votre alternance"
      description="Exprimez votre besoin en alternance. Aucune inscription ne vous sera demandée."
    />

    <ScrollToTop />
    <Navigation currentPage="acces-recruteur" />
    <Breadcrumb forPage="acces-recruteur" label="Accès recruteur" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
        <Entreprise />

        <section className="c-section__beige">
          <PostezVotreOffre />
          <OffresGratuites />
          <OrganismesMandataires />
        </section>

        <section className="c-section__beige">
          <GerezOffres />
        </section>

        <section>Vous souhaitez recruter un alternant ?</section>

        <AmeliorerLBA />

        <PartenairesDeConfiance />
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default AccesRecruteur;
