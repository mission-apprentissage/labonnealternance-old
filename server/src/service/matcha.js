const axios = require("axios");
const { itemModel } = require("../model/itemModel");
const config = require("config");
const { trackApiCall } = require("../common/utils/sendTrackingEvent");
const { manageApiError } = require("../common/utils/errorManager");
const { encrypt } = require("../common/utils/encryptString");

const matchaApiEndpoint = `https://matcha${
  config.env === "production" ? "" : "-recette"
}.apprentissage.beta.gouv.fr/api/formulaire`;
const matchaSearchEndPoint = `${matchaApiEndpoint}/search`;
const matchaJobEndPoint = `${matchaApiEndpoint}/offre`;

const getMatchaJobs = async ({ romes, radius, latitude, longitude, api, caller }) => {
  try {
    const distance = radius || 10;

    let params = {
      romes: romes.split(","),
      distance,
      lat: latitude,
      lon: longitude,
    };

    const jobs = await axios.post(`${matchaSearchEndPoint}`, params);

    return transformMatchaJobsForIdea(jobs.data, radius, latitude, longitude);
  } catch (error) {
    return manageApiError({ error, api, caller, errorTitle: `getting jobs from Matcha (${api})` });
  }
};

// update du contenu avec des résultats pertinents par rapport au rayon
const transformMatchaJobsForIdea = (jobs) => {
  let resultJobs = {
    results: [],
  };

  if (jobs && jobs.length) {
    for (let i = 0; i < jobs.length; ++i) {
      let companyJobs = transformMatchaJobForIdea(jobs[i]._source, jobs[i].sort[0]);
      companyJobs.map((job) => resultJobs.results.push(job));
    }
  }

  return resultJobs;
};

const getMatchaJobById = async ({ id, caller }) => {
  try {
    const jobs = await axios.get(`${matchaJobEndPoint}/${id}`);
    const job = transformMatchaJobForIdea(jobs.data);

    if (caller) {
      trackApiCall({ caller: caller, nb_emplois: 1, result_count: 1, api: "jobV1/matcha", result: "OK" });
    }

    return { matchas: job };
  } catch (error) {
    return manageApiError({ error, api: "jobV1/matcha", caller, errorTitle: "getting job by id from Matcha" });
  }
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformMatchaJobForIdea = (job, distance) => {
  let resultJobs = [];

  job.offres.map((offre, idx) => {
    let resultJob = itemModel("matcha");
    resultJob.id = `${job.id_form}-${idx}`;
    resultJob.title = offre.libelle;
    resultJob.contact = {
      email: job.email ? encrypt(job.email) : "",
      name: job.prenom + " " + job.nom,
      phone: job.telephone,
    };

    resultJob.place.distance = Math.round(10 * distance) / 10;
    resultJob.place.fullAddress = job.adresse;
    resultJob.place.address = job.adresse;
    resultJob.place.latitude = job.geo_coordonnees.split(",")[0];
    resultJob.place.longitude = job.geo_coordonnees.split(",")[1];

    resultJob.company.siret = job.siret;
    resultJob.company.name = job.raison_sociale;

    resultJob.diplomaLevel = offre.niveau;
    resultJob.createdAt = job.createdAt;
    resultJob.lastUpdateAt = job.updatedAt;

    resultJob.job = {
      id: offre._id,
      description: offre.description,
      creationDate: job.createdAt,
      contractType: offre.type,
      jobStartDate: offre.date_debut_apprentissage,
    };

    resultJob.romes = [];
    offre.romes.map((code) => resultJob.romes.push({ code }));

    resultJobs.push(resultJob);
  });

  return resultJobs;
};

module.exports = { getMatchaJobById, getMatchaJobs };
