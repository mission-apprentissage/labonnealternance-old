const { getBonnesBoitesES } = require("../../common/esClient");
const { itemModel } = require("../../model/itemModel");
const { manageApiError } = require("../../common/utils/errorManager");
const { encryptMailWithIV } = require("../../common/utils/encryptString");
const { isAllowedSource, isAllowedClearEmail } = require("../../common/utils/isAllowedSource");

const esClient = getBonnesBoitesES();

const allowedSources = config.private.allowedSources;

const isAllowedSource = ({ referer, caller }) => {
  return isOriginLocal(referer) || allowedSources.split("|").indexOf(caller) >= 0;
};

const getSomeLbbCompanies = async ({ romes, latitude, longitude, radius, type, referer, caller, api = "jobV1" }) => {
  const hasLocation = latitude === undefined ? false : true;
  let companies = null;
  let currentRadius = hasLocation ? radius : 21000;
  let companyLimit = 150; //TODO: query params options or default value from properties -> size || 100

  companies = await getLbbCompanies({
    romes,
    latitude,
    longitude,
    radius: currentRadius,
    companyLimit,
    type,
    caller,
    api,
  });

  if (companies && companies.length) {
    companies = transformLbbCompaniesForIdea({ companies, radius, type, referer, caller });
  }

  return companies;
};

const transformLbbCompaniesForIdea = ({ companies, type, referer, caller }) => {
  let resultCompanies = {
    results: [],
  };

  if (companies && companies.length) {
    const contactAllowedOrigin = isAllowedSource({ referer, caller });
    const clearContactAllowedOrigin = isAllowedClearEmail({ caller });

    for (let i = 0; i < companies.length; ++i) {
      let company = transformLbbCompanyForIdea({
        company: companies[i],
        type,
        contactAllowedOrigin,
        clearContactAllowedOrigin,
      });
      resultCompanies.results.push(company);
    }
  }

  return resultCompanies;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformLbbCompanyForIdea = ({ company, type, contactAllowedOrigin, clearContactAllowedOrigin }) => {
  let resultCompany = itemModel(type);

  resultCompany.title = company.enseigne;
  let email = clearContactAllowedOrigin ? { email: company.email } : encryptMailWithIV(company.email);

  if (contactAllowedOrigin) {
    resultCompany.contact = {
      ...email,
      phone: company.telephone,
    };
  }

  // format différent selon accès aux bonnes boîtes par recherche ou par siret
  const address = `${company.numero_rue} ${company.libelle_rue}, ${company.code_postal} ${company.ville}`.trim();

  resultCompany.place = {
    distance: company.distance?.length ? Math.round(10 * company.distance[0]) / 10 ?? 0 : null,
    fullAddress: address,
    latitude: company.geo_coordonnees.split(",")[0],
    longitude: company.geo_coordonnees.split(",")[1],
    city: company.ville,
    address,
  };

  resultCompany.company = {
    name: company.enseigne,
    siret: company.siret,
    size: company.tranche_effectif,
    //socialNetwork: company.social_network,
    url: company.website,
  };

  //resultCompany.url = company.url;

  /*resultCompany.romes = [
    {
      code: company.matched_rome_code,
      label: company.matched_rome_label,
    },
  ];*/

  resultCompany.nafs = [
    {
      code: company.code_naf,
      label: company.intitule_naf,
    },
  ];

  return resultCompany;
};

const getLbbCompanies = async ({ romes, latitude, longitude, radius, companyLimit, type, caller, api = "jobV1" }) => {
  try {
    const distance = radius || 10;

    let mustTerm = [
      {
        match: {
          romes: romes.split(",").join(" "),
        },
      },
      {
        match: {
          type,
        },
      },
    ];

    const esQueryIndexFragment = getBonnesBoitesEsQueryIndexFragment(companyLimit);

    let esQuerySort = {
      sort: [
        latitude || latitude === 0
          ? {
              _geo_distance: {
                geo_coordonnees: [parseFloat(longitude), parseFloat(latitude)],
                order: "asc",
                unit: "km",
                mode: "min",
                distance_type: "arc",
                ignore_unmapped: true,
              },
            }
          : "_score",
      ],
    };

    let esQuery = {
      query: {
        bool: {
          must: mustTerm,
        },
      },
    };

    if (latitude || latitude === 0) {
      esQuery.query.bool.filter = {
        geo_distance: {
          distance: `${distance}km`,
          geo_coordonnees: {
            lat: latitude,
            lon: longitude,
          },
        },
      };
    } else {
      esQuery = {
        query: {
          function_score: esQuery,
        },
      };
    }

    const responseBonnesBoites = await esClient.search({
      ...esQueryIndexFragment,
      body: {
        ...esQuery,
        ...esQuerySort,
      },
    });

    let bonnesBoites = [];

    responseBonnesBoites.body.hits.hits.forEach((bonneBoite) => {
      bonnesBoites.push({ ...bonneBoite._source, distance: latitude || latitude === 0 ? bonneBoite.sort : null });
    });

    if (!latitude && latitude !== 0) {
      bonnesBoites.sort(function (a, b) {
        return a.enseigne.toLowerCase().localeCompare(b.enseigne.toLowerCase());
      });
    }

    return bonnesBoites;
  } catch (error) {
    return manageApiError({ error, api, caller, errorTitle: `getting bonnesBoites from local ES (${api})` });
  }
};

const getCompanyFromSiret = async ({ siret, referer, caller, type }) => {
  try {
    let mustTerm = [
      {
        match: {
          siret,
        },
      },
    ];

    const esQueryIndexFragment = getBonnesBoitesEsQueryIndexFragment(1);

    const responseBonnesBoites = await esClient.search({
      ...esQueryIndexFragment,
      body: {
        query: {
          bool: {
            must: mustTerm,
          },
        },
      },
    });

    let bonnesBoites = [];

    responseBonnesBoites.body.hits.hits.forEach((bonneBoite) => {
      bonnesBoites.push({ ...bonneBoite._source, distance: bonneBoite.sort });
    });

    if (responseBonnesBoites.body.hits.hits.length) {
      let company = transformLbbCompanyForIdea({
        company: { ...responseBonnesBoites.body.hits.hits[0]._source, distance: 0 },
        type,
        contactAllowedOrigin: isAllowedSource({ referer, caller }),
        clearContactAllowedOrigin: isAllowedClearEmail({ caller }),
      });

      return type === "lbb" ? { lbbCompanies: [company] } : { lbaCompanies: [company] };
    } else {
      return { result: "not_found", message: "Société non trouvée" };
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      return { result: "not_found", message: "Société non trouvée" };
    } else {
      return manageApiError({
        error,
        api: "jobV1/company",
        caller,
        errorTitle: "getting company by Siret from local ES",
      });
    }
  }
};

const getBonnesBoitesEsQueryIndexFragment = (limit) => {
  return {
    //index: "mnaformation",
    index: "bonnesboites",
    size: limit,
    _sourceIncludes: [
      "siret",
      "score",
      "raisonsociale",
      "enseigne",
      "code_naf",
      "intitule_naf",
      "romes",
      "numero_rue",
      "libelle_rue",
      "code_commune",
      "code_postal",
      "ville",
      "geo_coordonnees",
      "email",
      "telephone",
      "tranche_effectif",
      "type",
    ],
  };
};

module.exports = { getSomeLbbCompanies, getCompanyFromSiret };
