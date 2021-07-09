import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

import { getStaticMetiers, getStaticVilles } from "utils/getStaticData";


export default function Catalog(props) {
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <Breadcrumb forPage="metiers" label="Metiers" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <a href="/">Revenir</a>
        <h1 className="mt-4">Catalogue</h1>
        <p>Ensemble des métiers</p>
        {
          props.dataJobs.map((job, index) => {
            return <div key={index}><a href={`/metiers/${job.slug}`}>{job.name}</a></div>
          })
        }
      </div>

      <Footer />
    </div>
  )
}

// See https://nextjs.org/learn/basics/data-fetching/with-data
// Static data, please restart nextjs each time this function change
export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');
  const txtDirectory = path.join(process.cwd(), 'config')

  const dataTowns = getStaticVilles(path, fs, txtDirectory)
  const dataJobs = getStaticMetiers(path, fs, txtDirectory)

  // The value of the `props` key will be
  //  passed to the `Catalog` component
  return {
    props: {
      dataJobs: dataJobs,
      dataTowns: dataTowns
    }
  }
}
