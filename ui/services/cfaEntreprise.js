const listeCfaEntreprise = [
  "30460295600142",
  "38012986646850",
  "39334439500024",
  "40130835800019",
  "40863294100030",
  "41104468800025",
  "43389163700012",
  "44301104400049",
  "45200962400035",
  "48206895400171",
  "48430660000020",
  "51825892600030",
  "53150773900013",
  "80982162200028",
  "82427045800014",
  "83415492400015",
  "83467788200013",
  "85273947300019",
  "87838051800026",
  "88023479400019",
  "88847499600012",
  "88985357800017",
  "89127069600018",
  "89883464300014",
  "85163550800019",
  "40130835800019",
  "88514020200015",
];

export const isCfaEntreprise = (siret, siretGestionnaire) => {
  return listeCfaEntreprise.indexOf(siret) >= 0 || listeCfaEntreprise.indexOf(siretGestionnaire) >= 0;
};
