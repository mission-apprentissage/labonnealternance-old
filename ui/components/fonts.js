import React from "react";

const Fonts = () => {
  const url = "https://labonnealternance-recette.apprentissage.beta.gouv.fr";

  const getFontPreloadLinks = () => {
    return (
      <>
        <link
          rel="preload"
          href={`${url}/fonts/Inter/Inter-Regular.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href={`${url}/fonts/Marianne/Marianne-Medium.woff`}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href={`${url}/fonts/Inter/Inter-Bold.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href={`${url}/fonts/Inter/Inter-SemiBold.ttf`}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href={`${url}/fonts/Marianne/Marianne-Bold.woff`}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        ></link>
      </>
    );
  };

  return <>{getFontPreloadLinks()}</>;
};

export default Fonts;
