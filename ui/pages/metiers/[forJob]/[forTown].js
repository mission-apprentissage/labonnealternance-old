import React from "react";
import { getStaticMetiers, getStaticVilles } from "utils/getStaticData";
import { buildLinkForTownAndJob } from "utils/buildLinkForTownAndJob";
import Navigation from "components/navigation";
import { useRouter } from "next/router";
import Footer from "components/footer";
import { NextSeo } from "next-seo";
import Breadcrumb from "components/breadcrumb";

export default function ForTown(props) {
  const router = useRouter();
  const find = require("lodash").find;
  const currentTownSlug = router.query.forTown;
  const currentJobSlug = router.query.forJob;
  const currentJob = find(props.dataJobs, (e) => e.slug === currentJobSlug);
  const currentTown = find(props.dataTowns, (e) => e.slug === currentTownSlug);

  const navigationItems = [
    { title: "Métiers", path: "metiers" },
    { title: currentJob.name, path: `metiers/${currentJobSlug}` },
    { title: currentTown.name, path: `metiers/${currentJobSlug}/${currentTownSlug}` },
  ];

  return (
    <div>
      <NextSeo
        title={`Tous les emplois et formations en alternance en ${currentJob.name} à ${currentTown.name} | La bonne alternance | Trouvez votre alternance`}
        description={`Chercher des emplois et formations en alternance pour le métier ${currentJob.name} dans la ville de ${currentTown.name}`}
      />
      <Navigation />
      <Breadcrumb items={navigationItems} />

      <div className="c-about c-page-container container my-0 mb-sm-5 p-5">
        <h1 className="mt-0">
          <span className="d-block c-page-title is-color-1">Tous les emplois et formations en alternance</span>
          <span className="d-block c-page-title is-color-2">
            {" "}
            en <i>{currentJob.name}</i> à {currentTown.name}
          </span>
        </h1>
        <hr className="c-catalog-title-separator mt-4 mb-5" align="left" />

        <p>
          Vous voulez travailler en contrat d'apprentissage ou en contrat de professionnalisation en{" "}
          <i>{currentJob.name}</i> à proximité de <i>{currentTown.name}</i> ?
        </p>
        <p>
          Vous voulez obtenir un diplôme en alternance en <i>{currentJob.name}</i> à proximité de{" "}
          <i>{currentTown.name}</i> ?
        </p>
        <p>
          Cliquez sur "lancer cette recherche" pour accéder aux résultats que La bonne alternance a trouvés pour vous !
        </p>

        <a href={buildLinkForTownAndJob(currentTown, currentJob)} className="btn btn-primary mt-3">
          Lancer cette recherche
        </a>
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
  const dataTowns = getStaticVilles(path, fs, txtDirectory);
  const flatten = require("lodash").flatten;

  const mapped_pathes = flatten(
    dataJobs.map((job) => {
      return dataTowns.map((town) => {
        return {
          params: {
            forJob: job.slug,
            forTown: town.slug,
          },
        };
      });
    })
  );

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
