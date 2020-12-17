import React from "react";
import Head from "next/head";

const HeadLaBonneAlternance = (props) => {
  return (
    <Head>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`,
        }}
      />
      {/* End Google Tag Manager */}
      {/* Google Tag Manager (noscript) */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
      />
      {/* End Google Tag Manager (noscript) */}
      
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
