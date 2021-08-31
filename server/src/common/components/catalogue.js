const axios = require("axios");
const logger = require("../logger");
const config = require("config");

const API = axios.create({ baseURL: `${config.private.catalogueUrl}` });

const getConvertedFormations = async (options, chunckCallback = null) => {
  let { page, allFormations, limit, query } = { page: 1, allFormations: [], limit: 1050, ...options };
  let params = { page, limit, query };

  try {
    const response = await API.get(config.formationsEndPoint, { params });

    const { formations, pagination } = response.data;
    allFormations = allFormations.concat(formations);

    if (page < pagination.nombre_de_page) {
      if (chunckCallback) {
        await chunckCallback(allFormations);
        allFormations = [];
      }
      return getConvertedFormations({ page: page + 1, allFormations, limit }, chunckCallback);
    } else {
      if (chunckCallback) {
        await chunckCallback(allFormations);
        return [];
      }
      return allFormations;
    }
  } catch (error) {
    logger.error("getConvertedFormations", error);
    throw new Error("unable to fetch Formations");
  }
};

const countFormations = async (query = {}) => {
  try {
    const response = await API.get(`${config.formationsEndPoint}/count`, { params: { query } });
    return response.data;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  getConvertedFormations,
  countFormations,
};
