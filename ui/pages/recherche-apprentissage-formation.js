import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { initParametersFromQuery } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { ParameterContext } from "../context/ParameterContextProvider";

const RechercheApprentissageFormation = () => {
  const dispatch = useDispatch();

  const parameterContext = React.useContext(ParameterContext);

  useEffect(() => {
    initParametersFromQuery({ dispatch, parameterContext });
  }, []);

  return (
    <>
      <NextSeo
        title="Recherche de formations | La Bonne Alternance | Trouvez votre alternance"
        description="Recherche de formations sur le site de La Bonne Alternance"
      />
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>

      <ScopeContextProvider value={{ isJob: false, isTraining: true, path: "/recherche-apprentissage-formation" }}>
        <SearchForTrainingsAndJobs />
      </ScopeContextProvider>
    </>
  );
};

export default RechercheApprentissageFormation;
