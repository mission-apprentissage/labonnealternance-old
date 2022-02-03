const { BonnesBoites } = require("../../common/model");
const { logMessage } = require("../../common/utils/logMessage");

const updateSAVECompanies = async ({ updateMap }) => {
  logMessage("info", "Starting updateSAVECompanies");
  for (const key in updateMap) {
    let company = updateMap[key];

    let bonneBoite = await BonnesBoites.findOne({ siret: company.siret });

    if (bonneBoite) {
      // remplacement pour une bonneBoite trouvée par les données modifiées dans la table update SAVE
      if (company.raisonsociale) {
        bonneBoite.raisonsociale = company.raisonsociale;
        bonneBoite.enseigne = company.enseigne;
      }

      if (company?.email === "remove") {
        bonneBoite.email = "";
      } else if (company.email) {
        bonneBoite.email = company.email;
      }

      if (company?.telephone === "remove") {
        bonneBoite.telephone = "";
      } else if (company.telephone) {
        bonneBoite.telephone = company.telephone;
      }

      if (company?.website === "remove") {
        bonneBoite.website = "";
      } else if (company.website) {
        bonneBoite.website = company.website;
      }

      bonneBoite.type = company.type;

      if (company.romes) {
        bonneBoite.romes = [...new Set(company.romes.concat(bonneBoite.romes))];
      }

      await bonneBoite.save();
    }
  }
  logMessage("info", "Ended updateSAVECompanies");
};

module.exports = {
  updateSAVECompanies,
};