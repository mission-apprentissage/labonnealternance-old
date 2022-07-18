import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useRouter } from "next/router";
import { initParametersFromQuery } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";
import { NextSeo } from "next-seo";
import { ParameterContext } from "../context/ParameterContextProvider";

import Head from "next/head";

const RechercheApprentissage = () => {
  const router = useRouter();

  const parameterContext = React.useContext(ParameterContext);

  useEffect(() => {
    initParametersFromQuery({ router, parameterContext });
  }, []);

  return (
    <>
      <NextSeo
        title="Recherche d'apprentissage | La bonne alternance | Trouvez votre alternance"
        description="Recherche d'apprentissage sur le site de La bonne alternance"
      />
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <ScopeContextProvider value={{ isJob: true, isTraining: true, path: "/recherche-apprentissage" }}>
        <SearchForTrainingsAndJobs />
      </ScopeContextProvider>
    </>
  );
};

export default RechercheApprentissage;
