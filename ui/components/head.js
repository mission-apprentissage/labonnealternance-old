import React from "react";
import Head from "next/head";
import Fonts from "./fonts";
import env from "utils/env";

const HeadLaBonneAlternance = (props) => {
  const getEnvFromProps = () => {
    let host = props.publicUrl || env;

    let envrnt = "production";
    if (host?.indexOf("recette") >= 0) {
      envrnt = "recette";
    }
    if (host?.indexOf("local") >= 0) {
      envrnt = "local";
    }

    return { env: envrnt, shoudLoadAnalytics: props.shouldLoadAnalytics };
  };

  return (
    <Head>
      <title>La bonne alternance | Trouvez votre alternance</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <link rel="canonical" href="http://labonnealternance.pole-emploi.fr" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <Fonts url={props.publicUrl} />

      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta id="robots-meta" name="robots" content="index, follow" />
      <meta name="keywords" content="contrat offres alternance emploi formation apprentissage" />
      <meta
        name="description"
        content="Vous ne trouvez pas de contrat ou d'offres d'alternance ? Essayez La bonne alternance ! Trouvez ici les formations en alternance et les entreprises qui recrutent régulièrement en alternance"
      />
      <meta name="google-site-verification" content="neOTrE-YKZ9LbgLlaX8UkYN6MJTPlWpeotPQqbrJ19Q" />
      <meta property="og:site_name" content="La bonne alternance" />
      <meta property="og:title" content="La bonne alternance - Trouvez votre alternance" />
      <meta property="og:type" content="site" />
      <meta property="og:url" content="https://labonnealternance.pole-emploi.fr" />
      <meta
        property="og:description"
        content="Vous ne trouvez pas de contrat ou d'offres d'alternance ? Essayez La bonne alternance ! Trouvez ici les formations en alternance et les entreprises qui recrutent régulièrement en alternance"
      />

      {getEnvFromProps().env !== "local" && getEnvFromProps().shoudLoadAnalytics ? (
        <script
          async
          src={`https://cdn.tagcommander.com/5234/${getEnvFromProps().env !== "production" ? "uat/" : ""}tc_lba_31.js`}
        ></script>
      ) : (
        ""
      )}
    </Head>
  );
};

export default HeadLaBonneAlternance;
