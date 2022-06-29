import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import WidgetPostuler from "../components/ItemDetail/CandidatureSpontanee/WidgetPostuler";

const Postuler = () => {
  return (
    <>
      <NextSeo
        title="Recherche d'emploi | La Bonne Alternance | Trouvez votre alternance"
        description="Recherche d'emploi sur le site de La Bonne Alternance."
      />
      <Head />
      <WidgetPostuler />
    </>
  );
};

export default Postuler;
