import React from 'react'
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
  
  const mapped = dataJobs.map((e) => {return {params:{forJob: e.slug}}})

  return {
    paths: mapped,
    fallback: false
  }
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
