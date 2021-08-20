import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { initParametersFromQuery } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";
import Head from "next/head";
import { NextSeo } from "next-seo";

const RechercheEmploi = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initParametersFromQuery({ dispatch });
  }, []);

  return (
    <>
      <NextSeo
        title="Recherche d'emploi | La Bonne Alternance | Trouvez votre alternance"
        description="Recherche d'emploi sur le site de La Bonne Alternance."
      />
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <ScopeContextProvider value={{ isJob: true, isTraining: false, path: "/recherche-emploi" }}>
        <SearchForTrainingsAndJobs />
      </ScopeContextProvider>
    </>
  );
};

export default RechercheEmploi;
