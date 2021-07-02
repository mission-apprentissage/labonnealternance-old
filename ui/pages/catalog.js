import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

export default function Catalog(props) {
  console.log('props', props);
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <Breadcrumb forPage="catalog" label="Catalogue" />
      
      <h1>Catalogue</h1>
      
      <Footer />
    </div>
  )
}

// See https://nextjs.org/learn/basics/data-fetching/with-data
// Static data, please restart nextjs each time this function change
export async function getStaticProps() {
  const uniq = require("lodash").uniq;
  const path = require('path');
  const fs = require('fs');
  const txtDirectory = path.join(process.cwd(), 'config')

  //metiers
  const fileJobPath = path.join(txtDirectory, 'metiers.txt')
  const lineJobString = fs.readFileSync(fileJobPath, 'utf8')
  const arrayOfJobLines = lineJobString.match(/[^\r\n]+/g);
  const dataJobs = arrayOfJobLines.map(function(singleLine) {
    const splitted = singleLine.split(' [')
    const actualName = splitted[0].trim()
    const romes = uniq(splitted[1].split(',').slice(0, -1))
    return {
      name: actualName,
      romes: romes
    };
  })


  //villes
  const fileTownPath = path.join(txtDirectory, 'villes.txt')
  const lineTownString = fs.readFileSync(fileTownPath, 'utf8')
  const arrayOfTownLines = lineTownString.match(/[^\r\n]+/g);
  const dataTowns = arrayOfTownLines.map(function(singleLine) {
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
