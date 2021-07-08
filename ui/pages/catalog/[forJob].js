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
      <div className="c-about c-page-container container my-0 mb-sm-5 p-5">
        <h1>Villes où chercher le métier</h1>
        <h1>" {props.dataJobs[0].name} "</h1>
      </div>
    </div>
  )
}

// Required.
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
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
  const dataJobs = getStaticMetiers(path, fs, txtDirectory)
  
  return {
    props: {
      dataTowns: dataTowns,
      dataJobs: dataJobs
    }
  }
}
