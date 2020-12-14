import React from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";

import Head from "next/head";

const RechercheApprentissage = () => (
  <>
    <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
    </Head>
    <SearchForTrainingsAndJobs />
  </>
);

export default RechercheApprentissage;
