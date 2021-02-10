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
        })(window,document,'script','dataLayer', 'GTM-T9G5QSC');`,
        }}
      />
      {/* End Google Tag Manager */}
      {/* Google Tag Manager (noscript) */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9G5QSC" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      {/* End Google Tag Manager (noscript) */}

      <title>La Bonne Alternance | Trouvez votre alternance</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
      <link rel="canonical" href="http://labonnealternance.pole-emploi.fr" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

      {process.env.publicUrl ? (
        <>
          <link
            rel="preload"
            href={`${process.env.publicUrl}/fonts/Inter/Inter-Regular.ttf`}
            as="font"
            type="font/ttf"
          ></link>
          <link
            rel="preload"
            href={`${process.env.publicUrl}/fonts/Marianne/Marianne-Medium.woff`}
            as="font"
            type="font/woff"
          ></link>
          <link
            rel="preload"
            href={`${process.env.publicUrl}/fonts/Inter/Inter-Bold.ttf`}
            as="font"
            type="font/ttf"
          ></link>
          <link
            rel="preload"
            href={`${process.env.publicUrl}/fonts/Inter/Inter-SemiBold.ttf`}
            as="font"
            type="font/ttf"
          ></link>
          <link
            rel="preload"
            href={`${process.env.publicUrl}/fonts/Marianne/Marianne-Bold.woff`}
            as="font"
            type="font/woff"
          ></link>
        </>
      ) : (
        ""
      )}

      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
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
