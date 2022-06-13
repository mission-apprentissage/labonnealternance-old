import React from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import { NextSeo } from "next-seo";

import Footer from "components/footer";
import CFA from "@/components/HomeComponents/CFA";
import PartenairesDeConfiance from "@/components/HomeComponents/PartenairesDeConfiance";
import AmeliorerLBA from "@/components/HomeComponents/AmeliorerLBA";
import ConnectionActions from "@/components/HomeComponents/ConnectionActions";
import PostezVotreOffreAlternance from "@/components/HomeComponents/PostezVotreOffreAlternance";
import OffresGratuites from "@/components/HomeComponents/OffresGratuites";
import ReseauEntreprise from "@/components/HomeComponents/ReseauEntreprise";
import GerezEntreprise from "@/components/HomeComponents/GerezEntreprise";
import GerezOffres from "@/components/HomeComponents/GerezOffres";

const Organisme = (props) => {
  return (
    <div>
      <NextSeo
        title="Organisme de formation | La Bonne Alternance | Trouvez votre alternance"
        description="Comment référencer ma formation ? Nous sommes là pour vous aider."
      />

      <Navigation bgcolor="is-white" currentPage="organisme-de-formation" />
      <Breadcrumb forPage="organisme-de-formation" label="Organisme de formation" />

      <div className="container my-0 px-0">
        <CFA />

        <section className="c-homecomponent__beige mb-5">
          <PostezVotreOffreAlternance />
          <GerezEntreprise />
          <OffresGratuites />
          <ReseauEntreprise />
        </section>

        <section className="c-homecomponent__beige">
          <GerezOffres />
        </section>

        <section className="text-center mb-5">
          <h2 className="c-homecomponent-title mb-5">Vous souhaitez attirer de nouveaux candidats?</h2>
          <div className="ml-4">
            <ConnectionActions service="cfa" />
          </div>
          <div className="clearfix" />
        </section>

        <AmeliorerLBA />

        <PartenairesDeConfiance />
      </div>
      <div className="mb-3">&nbsp;</div>
      <Footer />
    </div>
  );
};
export default Organisme;
