import React from 'react'
import Navigation from '../components/navigation'
import SearchForTrainingsAndJobs from '../components/SearchForTrainingsAndJobs'

const RechercheApprentissage = () => (
  <div>
    <h1>RechercheApprentissage</h1>
    <Navigation />
    <SearchForTrainingsAndJobs isTrainingOnly='false' />
  </div>
)

export default RechercheApprentissage
