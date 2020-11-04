const Sentry = require("@sentry/node");

const { getFormations, transformFormationsForIdea } = require("./formations");
const { getJobsFromApi } = require("./poleEmploi/jobsAndCompanies");
const { jobsEtFormationsQueryValidator } = require("./jobsEtFormationsQueryValidator");

const getJobsEtFormationsQuery = async (query) => {

  const queryValidationResult = jobsEtFormationsQueryValidator(query);

  if (queryValidationResult.error) return queryValidationResult;

  try {
    const sources = !query.sources ? ["formations", "lba", "lbb", "offres"] : query.sources.split(",");

    let [formations, jobs] = await Promise.all([
      sources.indexOf("formations") >= 0
        ? getFormations({
            romes: query.romes ? query.romes.split(",") : null,
            coords: [query.longitude, query.latitude],
            radius: query.radius,
            diploma: query.diploma,
            limit: 500,
            romeDomain: query.romeDomain,
          })
        : null,
      sources.indexOf("lba") >= 0 || sources.indexOf("lbb") >= 0 || sources.indexOf("offres") >= 0
        ? getJobsFromApi(query)
        : null,
    ]);

    if (formations && !formations.error) formations = transformFormationsForIdea(formations);

    return { formations, jobs };
  } catch (err) {
    console.log("Error ", err.message);
    Sentry.captureException(err);
    return { error: "internal_error" };
  }
};

module.exports = { getJobsEtFormationsQuery };
