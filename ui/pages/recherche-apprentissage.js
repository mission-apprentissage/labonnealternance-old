import React, { useEffect } from "react";
import SearchForTrainingsAndJobs from "../components/SearchForTrainingsAndJobs";
import { useDispatch } from "react-redux";
import { setWidgetParameters } from "store/actions";
import { getWidgetParameters } from "services/config";

import Head from "next/head";

const RechercheApprentissage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props && props.applyWidgetParameters) {
      dispatch(setWidgetParameters(props));
    }
  }, []);

  return (
    <>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <SearchForTrainingsAndJobs />
    </>
  );
};

export async function getServerSideProps({ query }) {
  return { props: getWidgetParameters(query) };
}

export default RechercheApprentissage;
