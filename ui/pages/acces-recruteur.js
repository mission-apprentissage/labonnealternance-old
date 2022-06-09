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
import ExternalLink from "@/components/externalLink";

const AccesRecruteur = () => (
  <div>
    <NextSeo
      title="Acces recruteur | La Bonne Alternance | Trouvez votre alternance"
      description="Exprimez votre besoin en alternance. Aucune inscription ne vous sera demandée."
    />

    <ScrollToTop />
    <Navigation currentPage="acces-recruteur" />
    <Breadcrumb forPage="acces-recruteur" label="Accès recruteur" />

    <div className="container my-0 px-0">
      <Entreprise />

      <section className="c-homecomponent__beige mb-5">
        <PostezVotreOffre />
        <OffresGratuites />
        <OrganismesMandataires />
      </section>

      <section className="c-homecomponent__beige">
        <GerezOffres />
      </section>

      <section className="text-center mb-5">
        <h2 className="c-homecomponent-title mb-5">Vous souhaitez recruter un alternant pour votre entreprise ?</h2>
        <div className="my-4 mx-auto">
          <ExternalLink className="c-homecomponent-link c-homecomponent-link mr-5" url="" title="Déposer une offre" />
          <ExternalLink className="c-homecomponent-link c-homecomponent-link__clear" url="" title="Me connecter" />
        </div>
      </section>

      <AmeliorerLBA />

      <PartenairesDeConfiance />
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default AccesRecruteur;
