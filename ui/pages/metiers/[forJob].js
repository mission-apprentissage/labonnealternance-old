import React from "react";
import { getStaticMetiers, getStaticVilles, extractFromFile } from "utils/getStaticData";
import Navigation from "components/navigation";
import { useSelector } from "react-redux";
import Footer from "components/footer";
import { NextSeo } from "next-seo";
import Breadcrumb from "components/breadcrumb";

export default function ForJob(props) {
  const routerState = useSelector((state) => state.router);
  const find = require("lodash").find;
  const last = require("lodash").last;
  const sortBy = require("lodash").sortBy;
  const currentSlug = last(routerState.location.href.split("/"));
  const currentJob = find(props.dataJobs, (e) => e.slug === currentSlug);
  const sortedTowns = sortBy(props.dataTowns, (e) => e.slug);

  const navigationItems = [
    { title: "Métiers", path: "metiers" },
    { title: currentJob.name, path: `metiers/${currentSlug}` },
  ];

  return (
    <div>
      <NextSeo
        title={`Emplois et formations en alternance pour le métier ${currentJob.name} | La Bonne Alternance | Trouvez votre alternance`}
        description={`Villes où chercher des emplois et formations en alternance pour le métier ${currentJob.name}`}
      />
      <Navigation />
      <Breadcrumb items={navigationItems} />
      <div className="c-about c-page-container container my-0 mb-sm-5 p-5">
        <h1 className="mt-0">
          <span className="d-block c-page-title is-color-1">Liste des villes pour</span>
          <span className="d-block c-page-title is-color-2">" {currentJob.name} "</span>
        </h1>
        <hr className="c-catalog-title-separator mt-4 mb-5" align="left" />

        {sortedTowns.map((currentTown, index) => {
          return (
            <div key={index}>
              <span className="d-block d-lg-inline">Emploi en alternance et formation en alternance en </span>
              <span className="d-block d-lg-inline">
                <a href={`/metiers/${currentJob.slug}/${currentTown.slug}`} className="c-catalog-link">
                  {currentJob.name} à {currentTown.name}
                </a>
              </span>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

// Required.
// See https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const path = require("path");
  const fs = require("fs");
  const txtDirectory = path.join(process.cwd(), "config");

  const dataJobs = getStaticMetiers(path, fs, txtDirectory);

  const mapped_pathes = dataJobs.map((e) => {
    return { params: { forJob: e.slug } };
  });

  return {
    paths: mapped_pathes,
    fallback: false,
  };
}

// See https://nextjs.org/learn/basics/data-fetching/with-data
// Static data, please restart nextjs each time this function change
export async function getStaticProps() {
  const path = require("path");
  const fs = require("fs");
  const txtDirectory = path.join(process.cwd(), "config");

  const dataTowns = getStaticVilles(path, fs, txtDirectory);
  const dataJobs = getStaticMetiers(path, fs, txtDirectory);

  return {
    props: {
      dataTowns: dataTowns,
      dataJobs: dataJobs,
    },
  };
}
