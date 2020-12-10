import Navigation from '../components/navigation'
import SearchForTrainingsAndJobs from '../components/SearchForTrainingsAndJobs'

import Head from 'next/head';

const RechercheApprentissageFormation = () => (
  <>
    <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
    </Head>
    <SearchForTrainingsAndJobs isTrainingOnly="true" />
  </>
)

export default RechercheApprentissageFormation