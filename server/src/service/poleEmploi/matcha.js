const axios = require("axios");
const Sentry = require("@sentry/node");
const { itemModel } = require("../../model/itemModel");

const matchaApiEndpoint = "https://matcha.apprentissage.beta.gouv.fr/api/formulaire/search";

const getMatchaJobs = async ({ romes, radius, latitude, longitude }) => {
  try {
    const distance = radius || 10;

    let params = {
      romes: romes.split(","),
      distance,
      lat: latitude,
      lon: longitude,
    };

    /*params = {
      distance: "30",
      lon: "2.347",
      lat: "48.859",
      romes: ["A1203", "A1414"],
    };*/

    console.log(`${matchaApiEndpoint}`, params);

    const jobs = await axios.post(`${matchaApiEndpoint}`, params);

    //throw new Error("boom");

    console.log("MATCHA : ", jobs.data);

    return transformMatchaJobsForIdea(jobs.data, radius, latitude, longitude);
  } catch (error) {
    console.log("error : ", error);

    let errorObj = { result: "error", message: error.message };

    Sentry.captureException(error);

    if (error.response) {
      errorObj.status = error.response.status;
      errorObj.statusText = error.response.statusText;
    }

    console.log("error get Matcha Jobs", errorObj);

    return errorObj;
  }
};

// update du contenu avec des résultats pertinents par rapport au rayon
const transformMatchaJobsForIdea = (jobs) => {
  let resultJobs = {
    results: [],
    inRadiusItems: 0,
  };

  if (jobs && jobs.length) {
    for (let i = 0; i < jobs.length; ++i) {
      console.log("jobs ", jobs[i]._source);
      let companyJobs = transformMatchaJobForIdea(jobs[i]._source, jobs[i].sort[0]);

      console.log("companyJobs ", companyJobs);

      companyJobs.map((job) => resultJobs.results.push(job));
    }
  }

  console.log("resultJobs ", resultJobs);

  return resultJobs;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformMatchaJobForIdea = (job, distance) => {
  let resultJobs = [];

  job.offres.map((offre) => {
    let resultJob = itemModel("matcha");
    resultJob.id = job.id_form;
    resultJob.title = offre.libelle;
    resultJob.contact = {
      email: job.email,
      name: job.prenom + " " + job.nom,
      phone: job.telephone,
    };

    resultJob.place.distance = distance;
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
      description: offre.description,
      creationDate: job.createdAt,
    };

    resultJob.romes = [];
    offre.romes.map((code) => resultJob.romes.push({ code }));

    resultJob.push(resultJob);
  });

  return resultJobs;
};

module.exports = { getMatchaJobs };
