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

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = 42;

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      dataval: 45
    }
  }
}
