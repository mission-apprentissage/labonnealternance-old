import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { setWidgetParameters, setItemParameters } from "store/actions";
import { getWidgetParameters, getItemParameters } from "services/config";
import { ScopeContextProvider } from "context/ScopeContext.js";

import Head from "next/head";

const RechercheApprentissage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const widgetParameters = getWidgetParameters();
    if (widgetParameters && widgetParameters.applyWidgetParameters) {
      dispatch(setWidgetParameters(widgetParameters));
    } else {
      const itemParameters = getItemParameters();
      if (itemParameters && itemParameters.applyItemParameters) {
        dispatch(setItemParameters(itemParameters));
      }
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <ScopeContextProvider value={{ isJob: true, isTraining: true, path:"/recherche-apprentissage" }}>
        <SearchForTrainingsAndJobs />
      </ScopeContextProvider>
    </>
  );
};

export default RechercheApprentissage;
