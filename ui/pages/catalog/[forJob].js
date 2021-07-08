import React from 'react'
import { getStaticMetiers, getStaticVilles } from 'utils/getStaticData'
import Navigation from '../../components/navigation'
import { useSelector } from 'react-redux'

export default function ForJob(props) {

  // console.log('props', props);
  const routerState = useSelector(state => state.router)
  return (
    <div>
      <Navigation />
      <pre>{JSON.stringify(routerState)}</pre>
      <h1>ForJob</h1>
    </div>
  )
}



export async function getStaticPaths() {
  const path = require('path');
  const fs = require('fs');
  const txtDirectory = path.join(process.cwd(), 'config')
  const dataJobs = getStaticMetiers(path, fs, txtDirectory)
  return {
    paths: dataJobs.map((e) => { return { params: { forJob: e.slug } } }),
    fallback: false
  }
}

// See https://nextjs.org/learn/basics/data-fetching/with-data
// Static data, please restart nextjs each time this function change
export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');
  const txtDirectory = path.join(process.cwd(), 'config')

  const dataTowns = getStaticVilles(path, fs, txtDirectory)

  // The value of the `props` key will be
  //  passed to the `Catalog` component
  return {
    props: {
      dataTowns: dataTowns
    }
  }
}
