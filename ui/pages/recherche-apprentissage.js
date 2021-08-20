import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { initParametersFromQuery } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";
import { NextSeo } from "next-seo";

import Head from "next/head";

const RechercheApprentissage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initParametersFromQuery({ dispatch });
  }, []);

  return (
    <>
      <NextSeo
        title="Recherche d'apprentissage | La Bonne Alternance | Trouvez votre alternance"
        description="Recherche d'apprentissage sur le site de La Bonne Alternance"
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
