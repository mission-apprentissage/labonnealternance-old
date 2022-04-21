const { BonnesBoites } = require("../../common/model");
const { logMessage } = require("../../common/utils/logMessage");

const updateSAVECompanies = async ({ updateMap }) => {
  logMessage("info", "Starting updateSAVECompanies");
  for (const key in updateMap) {
    let company = updateMap[key];

    let bonneBoite = await BonnesBoites.findOne({ siret: company.siret });

    if (key === "48799544100036") {
      logMessage(
        "info",
        "romes a retirer pour 48799544100036 " + key + " - " + company.siret + " - " + company.removedRomes.toString()
      );
    }

    if (bonneBoite) {
      let shouldSave = true;
      // remplacement pour une bonneBoite trouvée par les données modifiées dans la table update SAVE
      if (company.raisonsociale) {
        bonneBoite.raisonsociale = company.raisonsociale;
        bonneBoite.enseigne = company.enseigne;
      }

      if (company?.email === "remove") {
        bonneBoite.email = "";
      } else if (company.email && company.email != "NULL") {
        bonneBoite.email = company.email;
      }

      if (company?.telephone === "remove") {
        bonneBoite.telephone = "";
      } else if (company.telephone && company.telephone != "NULL") {
        bonneBoite.telephone = company.telephone;
      }

      if (company?.website === "remove") {
        bonneBoite.website = "";
      } else if (company.website && company.website != "NULL") {
        bonneBoite.website = company.website;
      }

      bonneBoite.type = company.type;

      if (company.romes) {
        bonneBoite.romes = [...new Set(company.romes.concat(bonneBoite.romes))];
      }

      if (company.removedRomes) {
        if (key === "48799544100036") {
          logMessage("info", "nous y sommes romes a retirer pour 48799544100036");
        }

        bonneBoite.romes = bonneBoite.romes.filter((el) => !company.removedRomes.includes(el));

        if (key === "48799544100036") {
          logMessage("info", "apres  48799544100036 " + bonneBoite.romes.toString());
        }

        if (bonneBoite.romes.length === 0) {
          logMessage("info", "suppression bb car pas de romes " + bonneBoite.siret);
          await bonneBoite.remove();
          shouldSave = false;
        }
      }

      if (shouldSave) {
        await bonneBoite.save();
      }
    }
  }
  logMessage("info", "Ended updateSAVECompanies");
};

module.exports = {
  updateSAVECompanies,
};
