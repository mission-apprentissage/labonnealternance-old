import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

export default function Catalog(props) {
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <Breadcrumb forPage="catalog" label="Catalogue" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <h1>Catalogue</h1>
        <p>Ensemble des métiers</p>
        {
          props.dataJobs.map((job, index) => {
            return <div key={index}><a href={`/catalog/${job.slug}`}>{job.name}</a></div>
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
  const uniq = require("lodash").uniq;
  const kebabCase = require("lodash").kebabCase;
  const path = require('path');
  const fs = require('fs');
  const txtDirectory = path.join(process.cwd(), 'config')

  //metiers
  const fileJobPath = path.join(txtDirectory, 'metiers.txt')
  const lineJobString = fs.readFileSync(fileJobPath, 'utf8')
  const arrayOfJobLines = lineJobString.match(/[^\r\n]+/g);
  const dataJobs = arrayOfJobLines.map(function (singleLine) {
    const splitted = singleLine.split(' [')
    const actualName = splitted[0].trim()
    const romes = uniq(splitted[1].split(',').slice(0, -1))
    return {
      name: actualName,
      slug: kebabCase(actualName),
      romes: romes
    };
  })


  //villes
  const fileTownPath = path.join(txtDirectory, 'villes.txt')
  const lineTownString = fs.readFileSync(fileTownPath, 'utf8')
  const arrayOfTownLines = lineTownString.match(/[^\r\n]+/g);
  const dataTowns = arrayOfTownLines.map(function (singleLine) {
    const splitted = singleLine.split('/')
    const townName = splitted[0].trim()
    const lon = splitted[4].trim()
    const lat = splitted[5].trim()
    const insee = splitted[2].trim()
    return {
      name: townName,
      lon: lon,
      lat: lat,
      insee: insee,
    };
  })

  // The value of the `props` key will be
  //  passed to the `Catalog` component
  return {
    props: {
      dataJobs: dataJobs,
      dataTowns: dataTowns
    }
  }
}
