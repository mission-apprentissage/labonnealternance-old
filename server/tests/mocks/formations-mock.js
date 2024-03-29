const formationRdvaMock = {
  cle_ministere_educatif: "id-formation-rdva-test",
  cfd: "50020007",
  nom: null,
  etablissement_gestionnaire_code_postal: "74570",
  etablissement_formateur_code_postal: "74570",
  code_commune_insee: "74137",
  num_departement: "74",
  region: "Auvergne-Rhône-Alpes",
  localite: "RdvaTest",
  etablissement_formateur_localite: "RDVA_TEST",
  etablissement_gestionnaire_localite: "RDVA_TEST",
  intitule_long: "Testeur RDVA (CAP)",
  intitule_court: "Testeur RDVA",
  diplome: "CERTIFICAT D'APTITUDES PROFESSIONNELLES",
  niveau: "3 (CAP...)",
  onisep_url: "http://www.onisep.fr/http/redirection/formation/identifiant/7796",
  rncp_code: "RNCP18704",
  rncp_intitule: "Testeur",
  rncp_eligible_apprentissage: true,
  capacite: null,
  id_rco_formation: "id-formation-rdva-test|03_0000173##03_1200005|80003",
  id_formation: "id-formation-rdva-test",
  etablissement_gestionnaire_id: "5e8df92120ff3b216126872a",
  etablissement_gestionnaire_uai: "0700008G",
  etablissement_gestionnaire_type: null,
  etablissement_gestionnaire_conventionne: null,
  etablissement_gestionnaire_adresse: "126 RTE DES EMPLOIS",
  etablissement_gestionnaire_complement_adresse: null,
  etablissement_gestionnaire_cedex: null,
  etablissement_gestionnaire_entreprise_raison_sociale: "CAMPUS DE DUMMY",
  etablissement_formateur_id: "5e8df92120ff3b216126872a",
  etablissement_formateur_siret: "30000000000018",
  etablissement_formateur_uai: "0700008G",
  etablissement_formateur_adresse: "126 CHE DES METIERS",
  etablissement_formateur_complement_adresse: null,
  etablissement_formateur_cedex: null,
  etablissement_formateur_entreprise_raison_sociale: "CAMPUS DE DUMMY",
  periode: ["2021-09-01T00:00:00.000Z", "2022-09-01T00:00:00.000Z"],
  idea_geo_coordonnees_etablissement: "46.002614,6.15737772159091",
  created_at: "2021-04-01T02:23:24.063Z",
  last_update_at: "2022-06-01T05:59:29.856Z",
  id: "5fd25616c67da3c3e6bd0810",
  email: "mock@mail.com",
  lieu_formation_adresse: "126 route des emplois",
  code_postal: "74570",
  etablissement_gestionnaire_siret: "30000004600018",
  rome_codes: ["D1102"],
  prdv_url: "https://example.com",
  prdv_loaded: true,
};

const formationMock = {
  cle_ministere_educatif: "id-formation-test",
  cfd: "50020007",
  nom: null,
  etablissement_gestionnaire_code_postal: "74570",
  etablissement_formateur_code_postal: "74570",
  code_commune_insee: "74137",
  num_departement: "74",
  region: "Auvergne-Rhône-Alpes",
  localite: "Dummy",
  etablissement_formateur_localite: "DUMMY",
  etablissement_gestionnaire_localite: "DUMMY",
  intitule_long: "BOULANGER (CAP)",
  intitule_court: "BOULANGER",
  diplome: "CERTIFICAT D'APTITUDES PROFESSIONNELLES",
  niveau: "3 (CAP...)",
  onisep_url: "http://www.onisep.fr/http/redirection/formation/identifiant/7796",
  rncp_code: "RNCP18704",
  rncp_intitule: "Boulanger",
  rncp_eligible_apprentissage: true,
  capacite: null,
  id_rco_formation: "id-formation-test|03_0000173##03_1200005|80003",
  id_formation: "id-formation-test",
  etablissement_gestionnaire_id: "5e8df92120ff3b216126872a",
  etablissement_gestionnaire_uai: "0700008G",
  etablissement_gestionnaire_type: null,
  etablissement_gestionnaire_conventionne: null,
  etablissement_gestionnaire_adresse: "126 RTE DES EMPLOIS",
  etablissement_gestionnaire_complement_adresse: null,
  etablissement_gestionnaire_cedex: null,
  etablissement_gestionnaire_entreprise_raison_sociale: "CAMPUS DE DUMMY",
  etablissement_formateur_id: "5e8df92120ff3b216126872a",
  etablissement_formateur_siret: "30000000000018",
  etablissement_formateur_uai: "0700008G",
  etablissement_formateur_adresse: "126 CHE DES METIERS",
  etablissement_formateur_complement_adresse: null,
  etablissement_formateur_cedex: null,
  etablissement_formateur_entreprise_raison_sociale: "CAMPUS DE DUMMY",
  periode: ["2021-09-01T00:00:00.000Z", "2022-09-01T00:00:00.000Z"],
  idea_geo_coordonnees_etablissement: "46.002614,6.15737772159091",
  created_at: "2021-04-01T02:23:24.063Z",
  last_update_at: "2022-06-01T05:59:29.856Z",
  id: "5fd25616c67da3c3e6bd0810",
  email: "mock@mail.com",
  lieu_formation_adresse: "126 route des emplois",
  code_postal: "74570",
  etablissement_gestionnaire_siret: "30000004600018",
  rome_codes: ["D1102"],
};

const formationsMock = [
  { source: formationMock, id: formationMock.id, sort: [5] },
  { source: formationRdvaMock, id: formationRdvaMock.id, sort: [10] },
  { source: { ...formationMock, intitule_long: "PATISSIER (CAP)" }, id: formationMock.id, sort: [15] },
];

const lbfFormationMock = {
  data: {
    objectif:
      "Exigeant, le métier de boulanger exige la maîtrise de la fermentation et de la cuisson des pains. Aujourd'hui, les boulangers proposent de plus en plus de produits comme les viennoiseries, les sandwichs... Il peut s'orienter vers l'artisanat, l'industrie ou la grande distribution.\nLe boulanger est un spécialiste de la fabrication et de la présentation des pains et viennoiseries. Il participe à l'approvisionnement, au stockage et au contrôle qualité des matières premières. Il pétrit la pâte, pèse et façonne les pains, assure le suivi de la fermentation des produits et de la cuisson.Titulaire du CAP, il débute comme ouvrier boulanger dans une entreprise artisanale ou industrielle, ou dans la grande distribution.À noter : le secteur de la boulangerie évolue vers la fabrication de produits de restauration légère (pizzas, sandwichs, salades ). Par ailleurs, les nouvelles techniques réduisent la pénibilité et la durée du travail des boulangers.En métropole, les épreuves de ce CAP peuvent également être organisées au cours du cursus du bac pro Boulanger\n-  pâtissier préparé en 3 ans.",
    "objectif-general-formation": "6",
    description:
      "L'enseignement technologique et professionnel concerne :    la technologie (connaissance des matières premières, des différents produits et des matériels, les étapes de la panification, les méthodes de fermentation, etc.);    les sciences appliquées à l'alimentation et à l'hygiène;    la connaissance de l'entreprise;    le pétrissage, pesage, façonnage, enfournement.Des ateliers d'expression artistique et d'éducation physique et sportive sont proposés en enseignements facultatifs.Le stage en entreprise se déroule sur une période de 16 semaines (8 semaines en 1re année, 8 semaines en 2e année).Modules    Unité facultative / Épreuve facultative (Ufac) - 01. Langue vivante;    Unité facultative / Épreuve facultative (Ufac) - Mobilité;    Unité générale (UG) - 01. Français et histoire\n-  géographie\n-  éducation civique;    Unité générale (UG) - 02. Mathématiques\n-  sciences physiques et chimiques;    Unité générale (UG) - 03. Langue vivante;    Unité générale (UG) - 04. EPS;    Unité professionnelle (UP) - 01. Épreuve de technologie professionnelle, de sciences appliquées et de gestion appliquée;    Unité professionnelle (UP) - 02. Production.Poursuite d'étudesIl existe plusieurs poursuites d'études dans le secteur de la boulangerie\n- pâtisserie pour le titulaire du CAP.DébouchésLes débouchés :Le titulaire du CAP boulanger débute comme ouvrier boulanger dans des entreprises artisanales, industrielles ou de grande distribution.Après quelques années d'expérience, il peut s'installer à son compte. Dans un hypermarché, il peut accéder aux fonctions de chef d'équipe ou de responsable de fabrication. Une autre possibilité consiste à s'expatrier.Le secteur de la boulangerie est en pleine évolution. Les nouvelles techniques facilitent le travail, et font gagner du temps. La fabrication de produits de restauration légère (quiches, sandwichs) se développe régulièrement.",
    sessions: [
      {
        debut: "2021-09-01",
        fin: "2022-06-30",
        "nombre-heures-total": 2400,
        "nombre-heures-entreprise": 0,
        "nombre-heures-centre": 0,
      },
      {
        debut: "2022-09-01",
        fin: "2024-06-30",
        "nombre-heures-total": 2400,
        "nombre-heures-entreprise": 0,
        "nombre-heures-centre": 0,
      },
    ],
    organisme: {
      nom: "Nom depuis LBF",
      siret: "30000000000018",
      localisation: {
        longitude: "4.8416405",
        latitude: "44.7760073",
        adresse: "5 rue de la mock\n",
        ville: "Mock city",
        "code-postal": "01234",
      },
      contact: {
        email: "maillbf@mail.com",
        url: "https://labonnealternance.apprentissage.beta.gouv.fr",
        tel: "01 01 01 01 01",
      },
    },
    "duree-indicative": "2 ans",
  },
};

module.exports = {
  formationMock,
  formationRdvaMock,
  formationsMock,
  lbfFormationMock,
};
