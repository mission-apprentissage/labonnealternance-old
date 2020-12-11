import React from "react";
import Head from "next/head";

const HeadLaBonneAlternance = (props) => {
  return (
    <Head>
      <title>La Bonne Alternance | Trouvez votre alternance</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <link rel="canonical" href="http://labonnealternance.pole-emploi.fr" />
      <meta id="robots-meta" name="robots" content="index, follow" />
      <meta name="keywords" content="contrat offres alternance" />
      <meta
        name="description"
        content="Vous ne trouvez pas de contrat ou d'offres d'alternance ? Essayez La Bonne Alternance ! Trouvez ici les formations en alternance et les entreprises qui recrutent régulièrement en alternance"
      />
      <meta property="og:site_name" content="La Bonne Alternance" />
      <meta property="og:title" content="La Bonne Alternance - Trouvez votre alternance" />
      <meta property="og:type" content="site" />
      <meta property="og:url" content="https://labonnealternance.pole-emploi.fr" />
      <meta
        property="og:description"
        content="Vous ne trouvez pas de contrat ou d'offres d'alternance ? Essayez La Bonne Alternance ! Trouvez ici les formations en alternance et les entreprises qui recrutent régulièrement en alternance"
      />
    </Head>
  );
};

export default HeadLaBonneAlternance;
