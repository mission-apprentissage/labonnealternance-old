const { SourceFormations } = require("../model");

const getCurrentFormationsSource = async () => {
  try {
    const sourceFormation = await SourceFormations.find({});

    console.log("getCurrentFormationsSource ", sourceFormation);

    return sourceFormation[0]?.currentIndex || "convertedformation_1";
  } catch (err) {
    console.log("err getCurrentFormationSource ", err);

    return "convertedformation_1";
  }
};

const updateFormationsSource = async (newSource) => {
  try {
    let currentSourceFormation = await SourceFormations.find({});

    let sourceFormation = null;

    if (currentSourceFormation && currentSourceFormation[0]) {
      console.log("source actuelle ", currentSourceFormation);
      sourceFormation = currentSourceFormation[0];
      sourceFormation.currentIndex = newSource;
      sourceFormation.last_update_at = new Date();
    } else {
      console.log("pas encore de source sauvée ");
      sourceFormation = new SourceFormations({
        currentIndex: newSource,
      });
    }
    let saveResult = await sourceFormation.save();

    console.log("source sauvée ", saveResult);
  } catch (err) {
    console.log("error saving formationSource ", err);
  }
};

module.exports = {
  getCurrentFormationsSource,
  updateFormationsSource,
};
