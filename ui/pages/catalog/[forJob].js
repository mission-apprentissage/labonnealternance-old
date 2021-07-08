import React from 'react'
import { getStaticMetiers, getStaticVilles } from 'utils/getStaticData'
import { buildLinkForTownAndJob } from 'utils/buildLinkForTownAndJob'
import Navigation from 'components/navigation'
import { useSelector } from 'react-redux'
import Footer from "components/footer";

export default function ForJob(props) {

  const routerState = useSelector(state => state.router)
  const find = require("lodash").find;
  const last = require("lodash").last;
  const sortBy = require("lodash").sortBy;
  const currentSlug = last(routerState.location.href.split('/'))
  const currentJob = find(props.dataJobs, (e) => e.slug === currentSlug)
  const sortedTowns = sortBy(props.dataTowns, (e) => e.slug)
  return (
    <div>
      <Navigation />
      <div className="c-about c-page-container container my-0 mb-sm-5 p-5">
        <h1>Villes où chercher le métier</h1>
        <h1 className="mb-5">" {currentJob.name} "</h1>

        {
          sortedTowns.map((town, index) => {
            return <div key={index}><a href={buildLinkForTownAndJob(town, currentJob)}>{town.name}</a></div>
          })
        }
      </div>
      <Footer />
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
