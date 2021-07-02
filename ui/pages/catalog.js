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
      
      <h1>Catalogue {props.dataval}</h1>
      
      <Footer />
    </div>
  )
}

// See https://nextjs.org/learn/basics/data-fetching/with-data
// Static data, please restart nextjs each time this function change
export async function getStaticProps() {
  const path = require('path');
  const fs = require('fs');
  const postsDirectory = path.join(process.cwd(), 'config')
  const filePath = path.join(postsDirectory, 'metiers.txt')
  const lineString = fs.readFileSync(filePath, 'utf8')
  const arrayOfLines = lineString.match(/[^\r\n]+/g);
  const dataJobs = arrayOfLines.map(function(singleLine) {
    const splitted = singleLine.split(' [')
    const actualName = splitted[0]
    return {
      name: actualName
    };
  })
  // Get external data from the file system, API, DB, etc.
  const data = 48;

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      dataval: data,
      datatxt: dataJobs
    }
  }
}
