const { SourceFormations } = require("../model");

module.exports = async () => {
  return {
    getCurrentFormationsSource: async () => {
      const sourceFormation = await SourceFormations.find({});
      return sourceFormation[0]?.currentIndex || "mnaFormations_1";
    },
    updateFormationsSource: async (newSource) => {
      let currentSourceFormation = await SourceFormations.find({});

      let sourceFormation = null;

      if (currentSourceFormation && currentSourceFormation[0]) {
        sourceFormation = currentSourceFormation[0];
        sourceFormation.currentIndex = newSource;
      } else {
        sourceFormation = new SourceFormations({
          currentIndex: newSource,
        });
      }
      await sourceFormation.save();

      /*
        todo: jouer avec les requêtes pour voir les résultats de find vs. findOne 

        voir ce qu'on retourne, gérer les erreurs
      */

      return "";
    },
  };
};
