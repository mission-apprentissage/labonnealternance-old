const listeCfaEntreprise = [
  "88847499600012",
  "85273947300019",
  "80982162200028",
  "48206895400171",
  "40863294100030",
  "45200962400035",
  "53150773900013",
  "38012986646850",
  "48430660000020",
  "83415492400015",
];

export const isCfaEntreprise = (siret) => {
  return listeCfaEntreprise.indexOf(siret) >= 0;
};
