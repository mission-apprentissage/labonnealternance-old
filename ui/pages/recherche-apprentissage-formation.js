import React from "react";
import Navigation from "../components/navigation";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { ScopeContextProvider } from "context/ScopeContext.js";

import Head from "next/head";

const RechercheApprentissageFormation = () => (
  <>
    <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    </Head>
    <ScopeContextProvider value={{ isJob: false, isTraining: true }}>
      <SearchForTrainingsAndJobs />
    </ScopeContextProvider>
  </>
);

export default RechercheApprentissageFormation;
