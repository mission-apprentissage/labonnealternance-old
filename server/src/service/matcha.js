const axios = require("axios");
const { itemModel } = require("../model/itemModel");
const config = require("config");
const { trackApiCall } = require("../common/utils/sendTrackingEvent");
const { manageApiError } = require("../common/utils/errorManager");
const { encryptMailWithIV } = require("../common/utils/encryptString");
const { isAllowedSource } = require("../common/utils/isAllowedSource");
const filterJobsByOpco = require("./filterJobsByOpco");
const matchaApiEndpoint = `https://matcha${
  config.env === "production" ? "" : "-recette"
}.apprentissage.beta.gouv.fr/api/formulaire`;
const matchaSearchEndPoint = `${matchaApiEndpoint}/search`;
const matchaJobEndPoint = `${matchaApiEndpoint}/offre`;

const coordinatesOfFrance = [2.213749, 46.227638];

const getMatchaJobs = async ({ romes, radius, latitude, longitude, api, opco, caller, referer }) => {
  try {
    const hasLocation = latitude === undefined ? false : true;

    let distance = hasLocation ? radius || 10 : 21000;

    let params = {
      romes: romes.split(","),
      distance,
      lat: hasLocation ? latitude : coordinatesOfFrance[1],
      lon: hasLocation ? longitude : coordinatesOfFrance[0],
    };

    const jobs = await axios.post(`${matchaSearchEndPoint}`, params);

    let matchas = transformMatchaJobsForIdea({ jobs: jobs.data, caller, referer });

    // filtrage sur l'opco
    if (opco) {
      matchas.results = await filterJobsByOpco({ opco, jobs: matchas.results });
    }

    if (!hasLocation) {
      sortMatchas(matchas);
    }

    return matchas;
  } catch (error) {
    return manageApiError({ error, api, caller, errorTitle: `getting jobs from Matcha (${api})` });
  }
};

// update du contenu avec des résultats pertinents par rapport au rayon
const transformMatchaJobsForIdea = ({ jobs, caller, referer }) => {
  let resultJobs = {
    results: [],
  };

  if (jobs && jobs.length) {
    const contactAllowedOrigin = isAllowedSource({ referer, caller });

    for (let i = 0; i < jobs.length; ++i) {
      let companyJobs = transformMatchaJobForIdea({
        job: jobs[i]._source,
        distance: jobs[i].sort[0],
        contactAllowedOrigin,
        caller,
      });
      companyJobs.map((job) => resultJobs.results.push(job));
    }
  }

  return resultJobs;
};

const getMatchaJobById = async ({ id, referer, caller }) => {
  try {
    const jobs = await axios.get(`${matchaJobEndPoint}/${id}`);
    const job = transformMatchaJobForIdea({
      job: jobs.data,
      contactAllowedOrigin: isAllowedSource({ referer, caller }),
      caller,
    });

    if (caller) {
      trackApiCall({ caller: caller, nb_emplois: 1, result_count: 1, api: "jobV1/matcha", result: "OK" });
    }

    return { matchas: job };
  } catch (error) {
    return manageApiError({ error, api: "jobV1/matcha", caller, errorTitle: "getting job by id from Matcha" });
  }
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformMatchaJobForIdea = ({ job, distance, caller, contactAllowedOrigin }) => {
  let resultJobs = [];

  job.offres.map((offre, idx) => {
    let resultJob = itemModel("matcha");

    let email = {};

    if (contactAllowedOrigin) {
      email = encryptMailWithIV({ value: job.email, caller });
    }

    resultJob.id = `${job.id_form}-${idx}`;
    resultJob.title = offre.libelle;
    resultJob.contact = {
      ...email,
      name: job.prenom + " " + job.nom,
      phone: job.telephone,
    };

    resultJob.place.distance = distance ? Math.round(10 * distance) / 10 : 0;
    resultJob.place.fullAddress = job.adresse;
    resultJob.place.address = job.adresse;
    resultJob.place.latitude = job.geo_coordonnees.split(",")[0];
    resultJob.place.longitude = job.geo_coordonnees.split(",")[1];

    resultJob.company.siret = job.siret;
    resultJob.company.name = job.raison_sociale;
    resultJob.company.size = job.tranche_effectif;
    resultJob.nafs = [{ label: job.libelle_naf }];
    resultJob.company.mandataire = job.mandataire;
    resultJob.company.creationDate = job.date_creation_etablissement;

    resultJob.diplomaLevel = offre.niveau;
    resultJob.createdAt = job.createdAt;
    resultJob.lastUpdateAt = job.updatedAt;

    resultJob.job = {
      id: offre._id,
      description: offre.description,
      creationDate: job.createdAt,
      contractType: offre.type,
      jobStartDate: offre.date_debut_apprentissage,
      romeDetails: offre.rome_detail,
      rythmeAlternance: offre.rythme_alternance,
      dureeContrat: offre.duree_contrat,
      quantiteContrat: offre.quantite,
      elligibleHandicap: offre.elligible_handicap,
    };

    resultJob.romes = [];
    offre.romes.map((code) => resultJob.romes.push({ code }));

    resultJobs.push(resultJob);
  });

  return resultJobs;
};

const sortMatchas = (matchas) => {
  matchas.results.sort((a, b) => {
    if (a?.title?.toLowerCase() < b?.title?.toLowerCase()) {
      return -1;
    }
    if (a?.title?.toLowerCase() > b?.title?.toLowerCase()) {
      return 1;
    }

    if (a?.company?.name?.toLowerCase() < b?.company?.name?.toLowerCase()) {
      return -1;
    }
    if (a?.company?.name?.toLowerCase() > b?.company?.name?.toLowerCase()) {
      return 1;
    }

    return 0;
  });
};

module.exports = { getMatchaJobById, getMatchaJobs };
