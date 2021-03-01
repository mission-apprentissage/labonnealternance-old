import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { setWidgetParameters } from "store/actions";
import { getWidgetParameters } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";

import Head from "next/head";

const RechercheApprentissageFormation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const widgetParameters = getWidgetParameters();
    if (widgetParameters && widgetParameters.applyWidgetParameters) {
      dispatch(setWidgetParameters(widgetParameters));
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <ScopeContextProvider value={{ isJob: false, isTraining: true, path: "/recherche-apprentissage-formation" }}>
        <SearchForTrainingsAndJobs />
      </ScopeContextProvider>
    </>
  );
};

export default RechercheApprentissageFormation;
