const axios = require("axios");
const Sentry = require("@sentry/node");
const { itemModel } = require("../../model/itemModel");

//const poleEmploi = require("./common.js");
const { getRoundedRadius } = require("./common.js");

const matchaApiEndpoint = "https://matcha.apprentissage.beta.gouv.fr/api/formulaire/search";

const getMatchaJobs = async ({ romes, radius, latitude, longitude }) => {
  try {
    const distance = radius || 10;

    let params = {
      romes,
      distance,
      lat: latitude,
      lon: longitude,
    };

    params = {
      distance: "100",
      lat: "2.3",
      lon: "48.8",
      romes: ["A1203", "A1414"],
    };

    console.log(`${matchaApiEndpoint}`, params);

    const jobs = await axios.post(`${matchaApiEndpoint}`, params, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        "content-type": "text/json",
      },
    });

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
const transformMatchaJobsForIdea = (jobs, radius, lat, long) => {
  let resultJobs = {
    results: [],
    inRadiusItems: 0,
  };

  if (jobs.resultats && jobs.resultats.length) {
    for (let i = 0; i < jobs.resultats.length; ++i) {
      let job = transformMatchaJobForIdea(jobs.resultats[i], lat, long);

      let distanceWeightModifier = 0;

      // si la distance au centre du point de recherche n'est pas connue, on la calcule avec l'utilitaire distance de turf.js
      if (job.place.latitude && job.place.longitude) {
        if (job.place.distance < getRoundedRadius(radius)) {
          resultJobs.inRadiusItems++;
        } else {
          distanceWeightModifier = (job.place.distance - radius) * 3;
        }
      } else {
        // dans certains cas latitude et longitude sont absents, parfois les deux sont à 0
        if (i === resultJobs.inRadiusItems) {
          // considéré arbitrairement comme dans le rayon
          resultJobs.inRadiusItems++;
        } else {
          distanceWeightModifier = getRoundedRadius(radius) + 100; // arbitraire
        }
      }

      if (distanceWeightModifier > 900) distanceWeightModifier = 900; // malus au poids maximal de 900 pour la distance

      job.ideaWeight = 1000 - distanceWeightModifier; // affectation d'un poids élevé pour les offres d'emploi

      resultJobs.results.push(job);
      //console.log("job weight : ", jobs.resultats[i].weight);
    }

    //console.log("inRadiusJobs : ", inRadiusJobs, radius);
  }

  return resultJobs;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformMatchaJobForIdea = (job /*, lat, long*/) => {
  let resultJob = itemModel("peJob");

  resultJob.title = job.intitule;

  //contact
  if (job.contact) {
    resultJob.contact = {};
    if (job.contact.nom) resultJob.contact.name = job.contact.nom;
    if (job.contact.courriel) resultJob.contact.email = job.contact.courriel;
    if (job.contact.coordonnees1)
      resultJob.contact.info = `${job.contact.coordonnees1}${
        job.contact.coordonnees2 ? "\n" + job.contact.coordonnees2 : ""
      }${job.contact.coordonnees3 ? "\n" + job.contact.coordonnees3 : ""}`;
  }

  resultJob.place = {
    distance: 0, //lat === null ? 0 : computeJobDistanceToSearchCenter(job, lat, long),
    insee: job.lieuTravail.commune,
    zipCode: job.lieuTravail.codePostal,
    city: job.lieuTravail.libelle,
    latitude: job.lieuTravail.latitude,
    longitude: job.lieuTravail.longitude,
    fullAddress: `${job.lieuTravail.libelle} ${job.lieuTravail.codePostal}`,
  };

  resultJob.company = {};

  if (job.entreprise) {
    if (job.entreprise.nom) resultJob.company.name = job.entreprise.nom;
    if (job.entreprise.logo) resultJob.company.logo = job.entreprise.logo;
    if (job.entreprise.description) resultJob.company.description = job.entreprise.description;
  }

  resultJob.url = `https://candidat.pole-emploi.fr/offres/recherche/detail/${job.id}`;

  resultJob.job = {
    id: job.id,
    creationDate: job.dateCreation,
    description: job.description,
    contractType: job.typeContrat,
    contractDescription: job.typeContratLibelle,
    duration: job.dureeTravailLibelle,
  };

  if (job.romeCode) {
    resultJob.romes = [
      {
        code: job.romeCode,
        label: job.appellationLibelle,
      },
    ];
  }

  return resultJob;
};

module.exports = { getMatchaJobs };
