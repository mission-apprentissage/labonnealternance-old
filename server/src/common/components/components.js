const { connectToMongo } = require("../mongodb");
const createCatalogue = require("./catalogue");

module.exports = async (options = {}) => {
  const catalogue = options.catalogue || createCatalogue();

  return {
    catalogue,
    db: options.db || (await connectToMongo()).db,
  };
};
