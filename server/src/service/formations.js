const { getCatalogueES } = require("../common/esClient");
const Sentry = require("@sentry/node");
const _ = require("lodash");
const { itemModel } = require("../model/itemModel");
const { formationsQueryValidator, formationsRegionQueryValidator } = require("./formationsQueryValidator");
const { trackEvent } = require("../common/utils/sendTrackingEvent");

const formationResultLimit = 500;

const getFormations = async ({ romes, romeDomain, coords, radius, diploma, limit }) => {
  //console.log(romes, coords, radius, diploma);

  try {
    const esClient = getCatalogueES();

    const distance = radius || 30;

    let mustTerm = [
      romes
        ? {
            match: {
              rome_codes: romes.join(" "),
            },
          }
        : {
            multi_match: {
              query: romeDomain,
              fields: ["rome_codes"],
              type: "phrase_prefix",
              operator: "or",
            },
          },
    ];

    if (diploma)
      mustTerm.push({
        match: {
          niveau: diploma,
        },
      });

    const esQueryIndexFragment = getFormationEsQueryIndexFragment(limit);

    const responseFormations = await esClient.search({
      ...esQueryIndexFragment,
      body: {
        query: {
          bool: {
            must: mustTerm,
            filter: {
              geo_distance: {
                distance: `${distance}km`,
                idea_geo_coordonnees_etablissement: {
                  lat: coords[1],
                  lon: coords[0],
                },
              },
            },
          },
        },
        sort: [
          {
            _geo_distance: {
              idea_geo_coordonnees_etablissement: [parseFloat(coords[0]), parseFloat(coords[1])],
              order: "asc",
              unit: "km",
              mode: "min",
              distance_type: "arc",
              ignore_unmapped: true,
            },
          },
        ],
      },
    });

    let formations = [];

    responseFormations.body.hits.hits.forEach((formation) => {
      formations.push({ source: formation._source, sort: formation.sort, id: formation._id });
    });

    return formations;
  } catch (err) {
    let error_msg = _.get(err, "meta.body", err.message);
    console.error("Error getting trainings from romes ", error_msg);
    if (_.get(err, "meta.meta.connection.status") === "dead") {
      console.error("Elastic search is down or unreachable");
    }
    return { error: error_msg };
  }
};

const getRegionFormations = async ({
  romes,
  romeDomain,
  region,
  departement,
  diploma,
  limit = formationResultLimit,
}) => {
  //console.log(romes, coords, radius, diploma);

  try {
    const esClient = getCatalogueES();

    let mustTerm = [];

    if (departement)
      mustTerm.push({
        multi_match: {
          query: departement,
          fields: ["code_postal"],
          type: "phrase_prefix",
          operator: "or",
        },
      });

    if (region) mustTerm.push(getEsRegionTermFragment(region));

    if (romes)
      mustTerm.push({
        match: {
          rome_codes: romes.join(" "),
        },
      });

    if (romeDomain)
      mustTerm.push({
        multi_match: {
          query: romeDomain,
          fields: ["rome_codes"],
          type: "phrase_prefix",
          operator: "or",
        },
      });

    if (diploma)
      mustTerm.push({
        match: {
          niveau: diploma,
        },
      });

    const esQueryIndexFragment = getFormationEsQueryIndexFragment(limit);

    //  console.log(mustTerm);

    const responseFormations = await esClient.search({
      ...esQueryIndexFragment,
      body: {
        query: {
          bool: {
            must: mustTerm,
          },
        },
      },
    });

    let formations = [];

    responseFormations.body.hits.hits.forEach((formation) => {
      formations.push({ source: formation._source, sort: formation.sort, id: formation._id });
    });

    return formations;
  } catch (err) {
    let error_msg = _.get(err, "meta.body", err.message);
    console.error("Error getting trainings from romes ", error_msg);
    if (_.get(err, "meta.meta.connection.status") === "dead") {
      console.error("Elastic search is down or unreachable");
    }
    return { error: error_msg };
  }
};

// tente de récupérer des formatiosn dans le rayon de recherche, si sans succès cherche les maxOutLimitFormation les plus proches du centre de recherche
const getAtLeastSomeFormations = async ({ romes, romeDomain, coords, radius, diploma, maxOutLimitFormation }) => {
  try {
    let formations = [];
    let currentRadius = radius;
    let formationLimit = formationResultLimit;

    formations = await getFormations({
      romes,
      romeDomain,
      coords,
      radius: currentRadius,
      diploma,
      limit: formationLimit,
    });

    // si pas de résultat on étend le rayon de recherche et on réduit le nombre de résultats autorisés
    if (formations instanceof Array && formations.length === 0) {
      formationLimit = maxOutLimitFormation; // limite réduite car extension au delà du rayon de recherche
      currentRadius = 20000;
      formations = await getFormations({
        romes,
        romeDomain,
        coords,
        radius: currentRadius,
        diploma,
        limit: formationLimit,
      });
    }

    formations = deduplicateFormations(formations);

    //throw new Error("BANG");
    formations = transformFormationsForIdea(formations);

    return formations;
  } catch (error) {
    let errorObj = { result: "error", message: error.message };

    Sentry.captureException(error);

    if (error.response) {
      errorObj.status = error.response.status;
      errorObj.statusText = error.response.statusText;
    }

    console.error("error get Trainings", errorObj);

    return errorObj;
  }
};

const deduplicateFormations = (formations) => {
  if (formations instanceof Array && formations.length > 0) {
    return formations.reduce((acc, formation) => {
      const found = acc.find((f) => {
        //console.log(f.source.nom,formation.source.nom,"-----",f.source.intitule,formation.source.intitule,"-----",f.source.etablissement_formateur_siret,formation.source.etablissement_formateur_siret,"------",f.source.diplome,formation.source.diplome,"-----",f.source.code_postal,formation.source.code_postal);
        return (
          f.source.nom === formation.source.nom &&
          f.source.intitule === formation.source.intitule &&
          f.source.etablissement_formateur_siret === formation.source.etablissement_formateur_siret &&
          f.source.diplome === formation.source.diplome &&
          f.source.code_postal === formation.source.code_postal
        );
      });

      if (!found) {
        //console.log(formation.source.nom,"-----",formation.source.intitule,"-----",formation.source.etablissement_formateur_siret,"------",formation.source.diplome,"-----",formation.source.code_postal);
        acc = [...acc, formation];
      }

      return acc;
    }, []);
  } else {
    return formations;
  }
};

const transformFormationsForIdea = (formations) => {
  let resultFormations = {
    results: [],
  };

  if (formations.length) {
    for (let i = 0; i < formations.length; ++i) {
      resultFormations.results.push(transformFormationForIdea(formations[i]));
    }
  }

  return resultFormations;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformFormationForIdea = (formation) => {
  let resultFormation = itemModel("formation");

  resultFormation.title = formation.source.nom ? formation.source.nom : formation.source.intitule;
  resultFormation.longTitle = formation.source.intitule_long;
  resultFormation.diplomaLevel = formation.source.niveau;
  resultFormation.onisepUrl = formation.source.onisep_url;
  resultFormation.id = formation.id;

  if (formation.source.email) {
    resultFormation.contact = {
      email: formation.source.email,
    };
  }

  resultFormation.place = {
    distance: formation.sort ? formation.sort[0] : null,
    fullAddress: getTrainingAddress(formation.source), // adresse postale reconstruite à partir des éléments d'adresse fournis
    latitude: formation.source.idea_geo_coordonnees_etablissement
      ? formation.source.idea_geo_coordonnees_etablissement.split(",")[0]
      : null,
    longitude: formation.source.idea_geo_coordonnees_etablissement
      ? formation.source.idea_geo_coordonnees_etablissement.split(",")[1]
      : null,
    city: formation.source.etablissement_formateur_localite,
    address: `${formation.source.etablissement_formateur_adresse}${
      formation.source.etablissement_formateur_complement_adresse
        ? ", " + formation.source.etablissement_formateur_complement_adresse
        : ""
    }`,
    cedex: formation.source.etablissement_formateur_cedex,
    zipCode: formation.source.etablissement_formateur_code_postal,
    trainingZipCode: formation.source.code_postal,
  };

  resultFormation.company = {
    name: getTrainingSchoolName(formation.source), // pe -> entreprise.nom | formation -> etablissement_formateur_entreprise_raison_sociale | lbb/lba -> name
    siret: formation.source.etablissement_formateur_siret,
    headquarter: {
      // uniquement pour formation
      place: {
        address: `${formation.source.etablissement_gestionnaire_adresse}${
          formation.source.etablissement_gestionnaire_complement_adresse
            ? ", " + formation.source.etablissement_gestionnaire_complement_adresse
            : ""
        }`,
        cedex: formation.source.etablissement_gestionnaire_cedex,
        zipCode: formation.source.etablissement_gestionnaire_code_postal,
        city: formation.source.etablissement_gestionnaire_localite,
      },
      name: formation.source.etablissement_gestionnaire_entreprise_raison_sociale,
    },
  };

  if (formation.source.rome_codes && formation.source.rome_codes.length) {
    resultFormation.romes = [];

    formation.source.rome_codes.forEach((rome) => resultFormation.romes.push({ code: rome }));
  }

  return resultFormation;
};

const getTrainingAddress = (school) => {
  let schoolAddress = school.etablissement_formateur_adresse
    ? `${school.etablissement_formateur_adresse}${
        school.etablissement_formateur_complement_adresse
          ? `, ${school.etablissement_formateur_complement_adresse}`
          : ""
      } ${school.etablissement_formateur_localite ? school.etablissement_formateur_localite : ""} ${
        school.etablissement_formateur_code_postal ? school.etablissement_formateur_code_postal : ""
      }${school.etablissement_formateur_cedex ? ` CEDEX ${school.etablissement_formateur_cedex}` : ""}
        `
    : `${school.etablissement_gestionnaire_adresse}${
        school.etablissement_gestionnaire_complement_adresse
          ? `, ${school.etablissement_gestionnaire_complement_adresse}`
          : ""
      } ${school.etablissement_gestionnaire_localite ? school.etablissement_gestionnaire_localite : ""} ${
        school.etablissement_gestionnaire_code_postal ? school.etablissement_gestionnaire_code_postal : ""
      }${school.etablissement_gestionnaire_cedex ? ` CEDEX ${school.etablissement_gestionnaire_cedex}` : ""}
        `;

  return schoolAddress;
};

const getTrainingSchoolName = (school) => {
  let schoolName = school.etablissement_formateur_entreprise_raison_sociale
    ? school.etablissement_formateur_entreprise_raison_sociale
    : school.etablissement_gestionnaire_entreprise_raison_sociale;

  return schoolName;
};

const getFormationsQuery = async (query) => {
  //console.log("query : ", query);

  const queryValidationResult = formationsQueryValidator(query);

  if (queryValidationResult.error) return queryValidationResult;

  if (query.caller) {
    trackEvent({ category: "Appel API", action: "formationV1", label: query.caller });
  }

  try {
    const formations = await getAtLeastSomeFormations({
      romes: query.romes ? query.romes.split(",") : null,
      coords: [query.longitude, query.latitude],
      radius: query.radius,
      diploma: query.diploma,
      maxOutLimitFormation: 5,
      romeDomain: query.romeDomain,
    });

    //throw new Error("BIG BANG");
    return formations;
  } catch (err) {
    console.error("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

const getFormationsParRegionQuery = async (query) => {
  //console.log("query : ", query);

  const queryValidationResult = formationsRegionQueryValidator(query);

  if (queryValidationResult.error) return queryValidationResult;

  if (query.caller) {
    trackEvent({ category: "Appel API", action: "formationRegionV1", label: query.caller });
  }

  try {
    let formations = await getRegionFormations({
      romes: query.romes ? query.romes.split(",") : null,
      region: query.region,
      departement: query.departement,
      diploma: query.diploma,
      romeDomain: query.romeDomain,
    });

    formations = transformFormationsForIdea(formations);

    sortFormations(formations);

    //throw new Error("BIG BANG");
    return formations;
  } catch (err) {
    console.error("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

const getFormationEsQueryIndexFragment = (limit) => {
  return {
    //index: "formations",
    index: "mnaformation",
    size: limit,
    _sourceIncludes: [
      "etablissement_formateur_siret",
      "onisep_url",
      "_id",
      "email",
      "niveau",
      "idea_geo_coordonnees_etablissement",
      "intitule_long",
      "intitule",
      "nom",
      "code_postal",
      "diplome",
      "etablissement_formateur_adresse",
      "etablissement_formateur_code_postal",
      "etablissement_formateur_localite",
      "etablissement_formateur_entreprise_raison_sociale",
      "etablissement_formateur_cedex",
      "etablissement_formateur_complement_adresse",
      "etablissement_responsable_adresse",
      "etablissement_responsable_code_postal",
      "etablissement_responsable_localite",
      "etablissement_responsable_entreprise_raison_sociale",
      "etablissement_responsable_cedex",
      "etablissement_responsable_complement_adresse",
      "rome_codes",
    ],
  };
};

const { regionCodeToDepartmentList } = require("../common/utils/regionInseeCodes");
const getEsRegionTermFragment = (region) => {
  let departements = [];

  regionCodeToDepartmentList[region].forEach((departement) => {
    departements.push({
      multi_match: {
        query: departement,
        fields: ["code_postal"],
        type: "phrase_prefix",
        operator: "or",
      },
    });
  });

  return {
    bool: {
      should: departements,
    },
  };
};

const sortFormations = (formations) => {
  formations.results.sort((a, b) => {
    if (a.company.name < b.company.name) {
      return -1;
    }
    if (a.company.name > b.company.name) {
      return 1;
    }

    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });
};

module.exports = {
  getFormationsQuery,
  getFormationsParRegionQuery,
  transformFormationsForIdea,
  getFormations,
  deduplicateFormations,
};
