import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

import { getStaticMetiers, getStaticVilles } from "utils/getStaticData";
import { NextSeo } from 'next-seo';


export default function Catalog(props) {
  return (
    <div>
      <NextSeo
        title={`Liste des métiers | La Bonne Alternance | Trouvez votre alternance`}
        description={`Listes de métiers où chercher son alternance`}
      />
      <ScrollToTop />
      <Navigation />
      <Breadcrumb forPage="metiers" label="Metiers" />

      <div className="c-page-container container my-0 mb-sm-5 pl-5 pt-3 pb-5">
        <h1 className="mt-4">
          <span className="d-block c-page-title is-color-1">Domaines</span>
          <span className="d-block c-page-title is-color-2">Métiers</span>
        </h1>
        <hr className="c-catalog-title-separator mt-4 mb-5" align="left" />

        {
          props.dataJobs.map((job, index) => {
            return <div key={index} className="mb-2 mb-lg-0">
                <span className="d-block d-lg-inline">Emploi en alternance et formation en alternance en </span>
                <span className="d-block d-lg-inline">
                  <a href={`/metiers/${job.slug}`} className="c-catalog-link">
                    {job.name}
                  </a>
                </span>
              </div>
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
