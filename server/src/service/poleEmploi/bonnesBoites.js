const axios = require("axios");
const Sentry = require("@sentry/node");
const { itemModel } = require("../../model/itemModel");
const { getAccessToken, peApiHeaders, getRoundedRadius } = require("./common.js");
const { isOriginLocal } = require("../../common/utils/isOriginLocal");

const getSomeLbbCompanies = async ({ romes, latitude, longitude, radius, type, strictRadius, referer }) => {
  let companySet = null;
  let currentRadius = strictRadius ? radius : 20000;
  let companyLimit = 100; //TODO: query params options or default value from properties -> size || 100

  let trys = 0;

  while (trys < 3) {
    companySet = await getLbbCompanies({ romes, latitude, longitude, radius: currentRadius, companyLimit, type });

    if (companySet.status === 429) {
      console.log("Lbb api quota exceeded. Retrying : ", trys + 1);
      // trois essais pour gérer les 429 quotas exceeded des apis PE.
      trys++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else break;
  }

  //console.log("companies :", companySet);
  if (companySet.companies && companySet.companies.length) {
    companySet = transformLbbCompaniesForIdea({ companySet, radius, type, strictRadius, referer });
    //console.log("apres refine : ", jobs.resultats[0].lieuTravail.distance);
  }

  return companySet;
};

const transformLbbCompaniesForIdea = ({ companySet, radius, type, strictRadius, referer }) => {
  let maxWeigth = type === "lbb" ? 800 : 900;
  if (!strictRadius) maxWeigth = 1000;

  let resultCompanies = {
    results: [],
    inRadiusItems: 0,
  };

  if (companySet.companies && companySet.companies.length) {
    const contactAllowedOrigin = isOriginLocal(referer);

    for (let i = 0; i < companySet.companies.length; ++i) {
      let company = transformLbbCompanyForIdea({ company: companySet.companies[i], type, contactAllowedOrigin });
      let distanceWeightModifier = 0;

      // détermine si la bonne boîte est dans le rayon de recherche initial ou non
      if (company.place.distance < getRoundedRadius(radius)) {
        resultCompanies.inRadiusItems++;
      } else {
        distanceWeightModifier = (company.place.distance - radius) * 3; // on retire au poids 3 pts par km au delà du rayon de recherche initial
      }

      if (distanceWeightModifier > maxWeigth) distanceWeightModifier = maxWeigth; // malus au poids maximal de maxWeight pour la distance

      company.ideaWeight = maxWeigth - distanceWeightModifier; // affectation d'un poids moins élevé que  pour les offres d'emploi

      resultCompanies.results.push(company);

      //console.log("comapany weight : ", companySet.companies[i].weight);
    }
  }

  return resultCompanies;
};

// Adaptation au modèle Idea et conservation des seules infos utilisées des offres
const transformLbbCompanyForIdea = ({ company, type, contactAllowedOrigin }) => {
  let resultCompany = itemModel(type);

  resultCompany.title = company.name;

  if (contactAllowedOrigin) {
    resultCompany.contact = {
      email: company.email,
      phone: company.phone,
    };
  }

  resultCompany.place = {
    distance: company.distance ?? 0,
    fullAddress: company.address,
    latitude: company.lat,
    longitude: company.lon,
    city: company.city,
    address: company.address,
  };

  resultCompany.company = {
    name: company.name,
    siret: company.siret,
    size: company.headcount_text,
    socialNetwork: company.social_network,
    url: company.website,
  };

  resultCompany.url = company.url;

  resultCompany.romes = [
    {
      code: company.matched_rome_code,
      label: company.matched_rome_label,
    },
  ];

  resultCompany.nafs = [
    {
      code: company.naf,
      label: company.naf_text,
    },
  ];

  return resultCompany;
};

const lbbApiEndpoint = "https://api.emploi-store.fr/partenaire/labonneboite/v1/company/";
const lbaApiEndpoint = "https://api.emploi-store.fr/partenaire/labonnealternance/v1/company/";
const lbbCompanyApiEndPoint = "https://api.emploi-store.fr/partenaire/labonneboite/v1/office/";

const getLbbCompanies = async ({ romes, latitude, longitude, radius, companyLimit, type }) => {
  try {
    const token = await getAccessToken(type);
    //console.log(token);
    let headers = peApiHeaders;
    headers.Authorization = `Bearer ${token}`;

    const distance = radius || 10;

    let params = {
      rome_codes: romes,
      latitude: latitude,
      sort: "distance",
      longitude: longitude,
      contract: type === "lbb" ? "dpae" : "alternance",
      page_size: companyLimit,
      distance,
    };

    const companies = await axios.get(`${type === "lbb" ? lbbApiEndpoint : lbaApiEndpoint}`, {
      params,
      headers,
    });

    //throw new Error(`boom ${type}`);

    return companies.data;
  } catch (error) {
    let errorObj = { result: "error", message: error.message };

    if (error?.response?.data) {
      errorObj.status = error.response.status;
      errorObj.statusText = `${error.response.statusText}: ${error.response.data}`;

      Sentry.captureMessage(errorObj.statusText);
    }
    Sentry.captureException(error);

    console.log("error get " + type + " Companies", errorObj);

    return errorObj;
  }
};

const getCompanyFromSiret = async ({ siret, referer, type }) => {
  try {
    const token = await getAccessToken("lbb");
    let headers = peApiHeaders;
    headers.Authorization = `Bearer ${token}`;

    const companyQuery = await axios.get(`${lbbCompanyApiEndPoint}${siret}/details`, {
      headers,
    });

    if (companyQuery.status === 204 || companyQuery.status === 400) {
      return { result: "not_found", message: "Société non trouvée" };
    } else {
      let company = transformLbbCompanyForIdea({
        company: companyQuery.data,
        type,
        contactAllowedOrigin: isOriginLocal(referer),
      });

      console.log("TYPE : ", type);

      return type === "lbb" ? { lbbCompanies: [company] } : { lbaCompanies: [company] };
    }
  } catch (error) {
    let errorObj = { result: "error", message: error.message };

    Sentry.captureException(error);

    if (error.response) {
      errorObj.status = error.response.status;
      errorObj.statusText = error.response.statusText;
    }

    console.log("error getting company by siret", errorObj);

    return errorObj;
  }
};

module.exports = { getSomeLbbCompanies, getCompanyFromSiret };
