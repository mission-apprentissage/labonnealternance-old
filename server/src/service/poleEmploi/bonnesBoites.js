const config = require("config");
const axios = require("axios");
const { getBonnesBoitesES } = require("../../common/esClient");
const { itemModel } = require("../../model/itemModel");
const { getAccessToken, peApiHeaders } = require("./common.js");
const { isOriginLocal } = require("../../common/utils/isOriginLocal");
const { manageApiError } = require("../../common/utils/errorManager");
const { encryptMailWithIV } = require("../../common/utils/encryptString");

const esClient = getBonnesBoitesES();

const allowedSources = config.private.allowedSources;

const isAllowedSource = ({ referer, caller }) => {
  return isOriginLocal(referer) || allowedSources.split("|").indexOf(caller) >= 0;
};

const getSomeLbbCompanies = async ({
  romes,
  latitude,
  longitude,
  radius,
  type,
  strictRadius,
  referer,
  caller,
  api = "jobV1",
}) => {
  let companySet = null;
  let currentRadius = strictRadius ? radius : 20000;
  let companyLimit = 100; //TODO: query params options or default value from properties -> size || 100

  companySet = await getLbbCompanies({
    romes,
    latitude,
    longitude,
    radius: currentRadius,
    companyLimit,
    type,
    caller,
    api,
  });

  //console.log("companies :", companySet);
  if (companySet && companySet.length) {
    companySet = transformLbbCompaniesForIdea({ companySet, radius, type, strictRadius, referer, caller });
    //console.log("apres refine : ", jobs.resultats[0].lieuTravail.distance);
  }

  return companySet;
};

const transformLbbCompaniesForIdea = ({ companySet, type, referer, caller }) => {
  let resultCompanies = {
    results: [],
  };

  if (companySet && companySet.length) {
    const contactAllowedOrigin = isAllowedSource({ referer, caller });

    for (let i = 0; i < companySet.length; ++i) {
      console.log("company : ", companySet[i]);
      let company = transformLbbCompanyForIdea({ company: companySet[i], type, contactAllowedOrigin });

      resultCompanies.results.push(company);
    }
  }

  return resultCompanies;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformLbbCompanyForIdea = ({ company, type, contactAllowedOrigin }) => {
  let resultCompany = itemModel(type);

  resultCompany.title = company.source.enseigne;

  if (contactAllowedOrigin) {
    resultCompany.contact = {
      ...encryptMailWithIV(company.source.email),
      phone: company.source.telephone,
    };
  }

  // format différent selon accès aux bonnes boîtes par recherche ou par siret
  const address = `${company.source.numero_rue} ${company.source.libelle_rue}, ${company.source.code_postal} ${company.source.ville}`.trim();

  resultCompany.place = {
    distance: company.sort[0] ?? 0,
    fullAddress: address,
    latitude: company.source.geo_coordonnees.split(",")[0],
    longitude: company.source.geo_coordonnees.split(",")[1],
    city: company.source.ville,
    address,
  };

  resultCompany.company = {
    name: company.source.enseigne,
    siret: company.source.siret,
    size: company.source.tranche_effectif,
    //socialNetwork: company.source.social_network,
    //url: company.website,
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
      code: company.source.code_naf,
      label: company.source.intitule_naf,
    },
  ];

  return resultCompany;
};

//const lbbApiEndpoint = "https://api.emploi-store.fr/partenaire/labonneboite/v1/company/";
//const lbaApiEndpoint = "https://api.emploi-store.fr/partenaire/labonnealternance/v1/company/";
const lbbCompanyApiEndPoint = "https://api.emploi-store.fr/partenaire/labonneboite/v1/office/";

const getLbbCompanies = async ({ romes, latitude, longitude, radius, companyLimit, type, caller, api = "jobV1" }) => {
  try {
    const distance = radius || 10;

    /*let params = {
      rome_codes: romes,
      latitude: latitude,
      sort: "distance", //sort: "score", TODO: remettre sort score après expérimentation CBS
      longitude: longitude,
      contract: type === "lbb" ? "dpae" : "alternance",
      page_size: companyLimit,
      distance,
    };*/

    console.log("romes : ", romes.split(",").join(" "));

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

    console.log("GO search bbs es ", mustTerm);

    const responseBonnesBoites = await esClient.search({
      ...esQueryIndexFragment,
      body: {
        query: {
          bool: {
            must: mustTerm,
            filter: {
              geo_distance: {
                distance: `${distance}km`,
                geo_coordonnees: {
                  lat: latitude,
                  lon: longitude,
                },
              },
            },
          },
        },
        sort: [
          {
            _geo_distance: {
              geo_coordonnees: [parseFloat(longitude), parseFloat(latitude)],
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

    //throw new Error("BOOM");
    let bonnesBoites = [];

    //console.log("response : ",responseBonnesBoites.body.hits.total), responseBonnesBoites.body.hits,);
    responseBonnesBoites.body.hits.hits.forEach((bonneBoite) => {
      //console.log("bonneBoite : ",bonneBoite);
      bonnesBoites.push({ source: bonneBoite._source, sort: bonneBoite.sort, id: bonneBoite._id });
    });

    /*const companies = await axios.get(`${type === "lbb" ? lbbApiEndpoint : lbaApiEndpoint}`, {
      params,
      headers,
    });*/

    //throw new Error(`boom ${type}`);

    return bonnesBoites;
  } catch (error) {
    return manageApiError({ error, api, caller, errorTitle: `getting bonnesBoites frome local ES (${api})` });
  }
};

const getCompanyFromSiret = async ({ siret, referer, caller, type }) => {
  try {
    const token = await getAccessToken("lbb");
    let headers = peApiHeaders;
    headers.Authorization = `Bearer ${token}`;

    let companyQuery = null;

    try {
      companyQuery = await axios.get(`${lbbCompanyApiEndPoint}${siret}/details?contract=alternance`, {
        headers,
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        companyQuery = await axios.get(`${lbbCompanyApiEndPoint}${siret}/details`, {
          headers,
        });
      } else {
        throw err;
      }
    }

    let company = transformLbbCompanyForIdea({
      company: companyQuery.data,
      type,
      contactAllowedOrigin: isAllowedSource({ referer, caller }),
    });

    return type === "lbb" ? { lbbCompanies: [company] } : { lbaCompanies: [company] };
  } catch (error) {
    if (error?.response?.status === 404) {
      return { result: "not_found", message: "Société non trouvée" };
    } else {
      return manageApiError({ error, api: "jobV1/company", caller, errorTitle: "getting company by Siret from PE" });
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
