const Sentry = require("@sentry/node");

const offresPoleEmploi = require("./offresPoleEmploi");
const bonnnesBoites = require("./bonnesBoites");
const { jobsQueryValidator } = require("./jobsQueryValidator");
const { trackEvent } = require("../../common/utils/sendTrackingEvent");

const getJobsQuery = async (query) => {
  const queryValidationResult = jobsQueryValidator(query);

  if (queryValidationResult.error) return queryValidationResult;

  if (query.caller) {
    trackEvent({ category: "Appel API", action: "jobV1", label: query.caller });
  }

  return getJobsFromApi(query);
};

const getPeJobQuery = async (query) => {
  if (query.caller) {
    trackEvent({ category: "Appel API", action: "loadPeJobV1", label: query.caller });
  }

  try {
    const job = await offresPoleEmploi.getPeJobFromId({
      id: query.id,
    });

    //throw new Error("BIG BANG");
    return job;
  } catch (err) {
    console.error("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

const getCompanyQuery = async (query) => {
  if (query.caller) {
    trackEvent({ category: "Appel API", action: "loadCompanyV1", label: query.caller });
  }

  try {
    const company = await bonnnesBoites.getCompanyFromSiret({
      siret: query.siret,
      referer: query.referer,
      type: query.type,
    });

    //throw new Error("BIG BANG");
    return company;
  } catch (err) {
    console.error("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

const getJobsFromApi = async (query) => {
  try {
    const sources = !query.sources ? ["lba", "lbb", "offres"] : query.sources.split(",");

    const [peJobs, lbaCompanies, lbbCompanies] = await Promise.all([
      sources.indexOf("offres") >= 0
        ? offresPoleEmploi.getSomePeJobs({
            romes: query.romes.split(","),
            insee: query.insee,
            radius: parseInt(query.radius),
            lat: query.latitude,
            long: query.longitude,
            strictRadius: query.strictRadius,
          })
        : null,
      sources.indexOf("lba") >= 0
        ? bonnnesBoites.getSomeLbbCompanies({
            romes: query.romes,
            latitude: query.latitude,
            longitude: query.longitude,
            radius: parseInt(query.radius),
            type: "lba",
            strictRadius: query.strictRadius,
            referer: query.referer,
          })
        : null,
      sources.indexOf("lbb") >= 0
        ? bonnnesBoites.getSomeLbbCompanies({
            romes: query.romes,
            latitude: query.latitude,
            longitude: query.longitude,
            radius: parseInt(query.radius),
            type: "lbb",
            strictRadius: query.strictRadius,
            referer: query.referer,
          })
        : null,
    ]);

    //remove duplicates between lbas and lbbs. lbas stay untouched, only duplicate lbbs are removed
    if (lbaCompanies && lbbCompanies) deduplicateCompanies(lbaCompanies, lbbCompanies);

    //some magic with peJobs, lbbCompanies to have a correct number of returned jobs, more weight on peJobs
    getWeightedCompanies(peJobs, lbaCompanies, lbbCompanies);

    //throw new Error("kaboom");

    return { peJobs, lbaCompanies, lbbCompanies };
  } catch (err) {
    console.log("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

const deduplicateCompanies = (lbaCompanies, lbbCompanies) => {
  if (lbaCompanies.results && lbbCompanies.results) {
    let lbaSirets = [];
    for (let i = 0; i < lbaCompanies.results.length; ++i) {
      lbaSirets.push(lbaCompanies.results[i].company.siret);
    }

    let deduplicatedLbbCompanies = [];
    for (let i = 0; i < lbbCompanies.results.length; ++i) {
      if (lbaSirets.indexOf(lbbCompanies.results[i].company.siret) < 0)
        deduplicatedLbbCompanies.push(lbbCompanies.results[i]);
    }
    lbbCompanies.results = deduplicatedLbbCompanies;
  }
};

const getWeightedCompanies = (peJobs, lbaCompanies, lbbCompanies) => {
  //minimum 50 résultats
  let inRadiusJobs = 0;
  let inRadiusLbaCompanies = 0;
  let inRadiusLbbCompanies = 0;
  const minResult = 100;
  let newPeJobResult = [];
  let newLbaCompanyResult = [];
  let newLbbCompanyResult = [];

  //console.log("lbbCompanies : ",lbbCompanies);

  if (peJobs && peJobs.results && peJobs.inRadiusItems) {
    newPeJobResult = peJobs.results.slice(0, peJobs.inRadiusItems);
    inRadiusJobs = peJobs.inRadiusItems;
  }

  if (lbaCompanies && lbaCompanies.results && lbaCompanies.inRadiusItems) {
    newLbaCompanyResult = lbaCompanies.results.slice(0, lbaCompanies.inRadiusItems);
    inRadiusLbaCompanies += lbaCompanies.inRadiusItems;
  }

  if (lbbCompanies && lbbCompanies.results && lbbCompanies.inRadiusItems) {
    newLbbCompanyResult = lbbCompanies.results.slice(0, lbbCompanies.inRadiusItems);
    inRadiusLbbCompanies += lbbCompanies.inRadiusItems;
  }

  if (inRadiusLbaCompanies + inRadiusJobs < minResult) {
    let addedItem = 0;
    let jobCursor = inRadiusJobs;
    let lbaCompanyCursor = inRadiusLbaCompanies;
    let lbbCompanyCursor = inRadiusLbbCompanies;
    let nextJob = peJobs ? getNextItem(peJobs.results, jobCursor) : null;
    let nextLbaCompany = lbaCompanies ? getNextItem(lbaCompanies.results, lbaCompanyCursor) : null;
    let nextLbbCompany = lbbCompanies ? getNextItem(lbbCompanies.results, lbbCompanyCursor) : null;

    while (
      inRadiusLbaCompanies + inRadiusLbbCompanies + inRadiusJobs + addedItem < minResult &&
      (nextJob || nextLbaCompany || nextLbbCompany)
    ) {
      let maxWeightedItem = getMaxWeightedItem(nextJob, nextLbaCompany, nextLbbCompany);

      switch (maxWeightedItem.ideaType) {
        case "lba": {
          newLbaCompanyResult.push(nextLbaCompany);
          lbaCompanyCursor++;
          nextLbaCompany = getNextItem(lbaCompanies.results, lbaCompanyCursor);
          break;
        }
        case "lbb": {
          newLbbCompanyResult.push(nextLbbCompany);
          lbbCompanyCursor++;
          nextLbbCompany = getNextItem(lbbCompanies.results, lbbCompanyCursor);
          break;
        }
        case "peJob": {
          newPeJobResult.push(nextJob);
          jobCursor++;
          nextJob = getNextItem(peJobs.results, jobCursor);
          break;
        }
        default:
          break;
      }

      addedItem++; // forcément un item sinon on entre pas dans la boucle
    }
  }

  if (peJobs) peJobs.results = newPeJobResult;
  if (lbaCompanies) lbaCompanies.results = newLbaCompanyResult;
  if (lbbCompanies) lbbCompanies.results = newLbbCompanyResult;
};

const getMaxWeightedItem = (item1, item2, item3) => {
  let set = [item1, item2, item3];

  set.sort((a, b) => {
    if (a && (!b || a.weight >= b.weight)) {
      return -1;
    } else if (b && (!a || a.weight < b.weight)) {
      return 1;
    } else return 0;
  });

  return set[0];
};

const getNextItem = (items, position) => {
  if (items && items.length >= position) return items[position];
  else return null;
};

module.exports = { getJobsFromApi, getJobsQuery, getPeJobQuery, getCompanyQuery };
