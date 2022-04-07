const areas = {
  "01": {
    name: "Ain",
    lon: 5.348,
    lat: 46.099,
    zip: "01160",
    city: "Saint-Martin-du-Mont",
  },
  "02": {
    name: "Aisne",
    lon: 3.558,
    lat: 49.559,
    zip: "02000",
    city: "Clacy-et-Thierret",
  },
  "03": {
    name: "Allier",
    lon: 3.188,
    lat: 46.393,
    zip: "03240",
    city: "Treban",
  },
  "04": {
    name: "Alpes-de-Haute-Provence",
    lon: 6.243,
    lat: 44.106,
    zip: "04000",
    city: "Digne-les-Bains",
  },
  "05": {
    name: "Hautes-Alpes",
    lon: 6.263,
    lat: 44.663,
    zip: "05260",
    city: "Saint-Jean-Saint-Nicolas",
  },
  "06": {
    name: "Alpes-Maritimes",
    lon: 7.116,
    lat: 43.937,
    zip: "06710",
    city: "Massoins",
  },
  "07": {
    name: "Ardèche",
    lon: 4.424,
    lat: 44.751,
    zip: "07530",
    city: "Saint-Joseph-des-Bancs",
  },
  "08": {
    name: "Ardennes",
    lon: 4.64,
    lat: 49.615,
    zip: "08430",
    city: "Mazerny",
  },
  "09": {
    name: "Ariège",
    lon: 1.503,
    lat: 42.92,
    zip: "09000",
    city: "Brassac",
  },
  "10": {
    name: "Aube",
    lon: 4.161,
    lat: 48.304,
    zip: "10410",
    city: "Villechétif",
  },
  "11": {
    name: "Aude",
    lon: 2.414,
    lat: 43.103,
    zip: "11250",
    city: "Ladern-sur-Lauquet",
  },
  "12": {
    name: "Aveyron",
    lon: 2.679,
    lat: 44.28,
    zip: "12290",
    city: "Pont-de-Salars",
  },
  "13": {
    name: "Bouches-du-Rhône",
    lon: 5.086,
    lat: 43.543,
    zip: "13250",
    city: "Saint-Chamas",
  },
  "14": {
    name: "Calvados",
    lon: -0.363,
    lat: 49.099,
    zip: "14320",
    city: "May-sur-Orne",
  },
  "15": {
    name: "Cantal",
    lon: 2.668,
    lat: 45.051,
    zip: "15800",
    city: "Thiézac",
  },
  "16": {
    name: "Charente",
    lon: 0.201,
    lat: 45.718,
    zip: "16430",
    city: "Champniers",
  },
  "17": {
    name: "Charente-Maritime",
    lon: -0.674,
    lat: 45.78,
    zip: "17810",
    city: "Saint-Georges-des-Coteaux",
  },
  "18": {
    name: "Cher",
    lon: 2.491,
    lat: 47.064,
    zip: "18390",
    city: "Osmoy",
  },
  "19": {
    name: "Corrèze",
    lon: 1.876,
    lat: 45.356,
    zip: "19800",
    city: "Corrèze",
  },
  "2A": {
    name: "Corse-du-Sud",
    lon: 8.988,
    lat: 41.863,
    zip: "20190",
    city: "Santa-Maria-Siché",
  },
  "2B": {
    name: "Haute-Corse",
    lon: 9.206,
    lat: 42.394,
    zip: "20244",
    city: "Lano",
  },
  "21": {
    name: "Côte-d'Or",
    lon: 4.772,
    lat: 47.424,
    zip: "21440",
    city: "Saint-Martin-du-Mont",
  },
  "22": {
    name: "Côtes-d'Armor",
    lon: 1.136,
    lat: 48.441,
    zip: "22800",
    city: "Plaine-Haute",
  },
  "23": {
    name: "Creuse",
    lon: 2.018,
    lat: 46.09,
    zip: "23150",
    city: "Ahun",
  },
  "24": {
    name: "Dordogne",
    lon: 0.741,
    lat: 45.104,
    zip: "24660",
    city: "Notre-Dame-de-Sanilhac",
  },
  "25": {
    name: "Doubs",
    lon: 6.361,
    lat: 47.165,
    zip: "25530",
    city: "Chevigney-lès-Vercel",
  },
  "26": {
    name: "Drôme",
    lon: 5.168,
    lat: 44.684,
    zip: "26340",
    city: "Saint-Sauveur-en-Diois",
  },
  "27": {
    name: "Eure",
    lon: 0.996,
    lat: 49.113,
    zip: "27110",
    city: "Quittebeuf",
  },
  "28": {
    name: "Eure-et-Loir",
    lon: 1.37,
    lat: 48.387,
    zip: "28120",
    city: "Nogent-sur-Eure",
  },
  "29": {
    name: "Finistère",
    lon: 3.942,
    lat: 48.261,
    zip: "29590",
    city: "Lopérec",
  },
  "30": {
    name: "Gard",
    lon: 4.18,
    lat: 43.993,
    zip: "30190",
    city: "Boucoiran-et-Nozières",
  },
  "31": {
    name: "Haute-Garonne",
    lon: 1.172,
    lat: 43.358,
    zip: "31410",
    city: "Longages",
  },
  "32": {
    name: "Gers",
    lon: 0.453,
    lat: 43.692,
    zip: "32350",
    city: "Ordan-Larroque",
  },
  "33": {
    name: "Gironde",
    lon: -0.575,
    lat: 44.825,
    zip: "33000",
    city: "Bordeaux",
  },
  "34": {
    name: "Hérault",
    lon: 3.367,
    lat: 43.579,
    zip: "34800",
    city: "Cabrières",
  },
  "35": {
    name: "Ille-et-Vilaine",
    lon: 0.362,
    lat: 48.154,
    zip: "35830",
    city: "Betton",
  },
  "36": {
    name: "Indre",
    lon: 1.575,
    lat: 46.777,
    zip: "36250",
    city: "Niherne/Saint-Maur",
  },
  "37": {
    name: "Indre-et-Loire",
    lon: 0.691,
    lat: 47.258,
    zip: "37250",
    city: "Sorigny",
  },
  "38": {
    name: "Isère",
    lon: 5.576,
    lat: 45.263,
    zip: "38113",
    city: "Veurey-Voroize",
  },
  "39": {
    name: "Jura",
    lon: 5.697,
    lat: 46.728,
    zip: "39210",
    city: "La Marre",
  },
  "40": {
    name: "Landes",
    lon: -0.783,
    lat: 43.965,
    zip: "40110",
    city: "Villenave",
  },
  "41": {
    name: "Loir-et-Cher",
    lon: 1.429,
    lat: 47.616,
    zip: "41350",
    city: "Saint-Claude-de-Diray",
  },
  "42": {
    name: "Loire",
    lon: 4.165,
    lat: 45.726,
    zip: "42110",
    city: "Poncins",
  },
  "43": {
    name: "Haute-Loire",
    lon: 3.806,
    lat: 45.128,
    zip: "43350",
    city: "Saint-Paulien",
  },
  "44": {
    name: "Loire-Atlantique",
    lon: 0.318,
    lat: 47.361,
    zip: "44130",
    city: "Notre-Dame-des-Landes",
  },
  "45": {
    name: "Loiret",
    lon: 2.344,
    lat: 47.911,
    zip: "45110",
    city: "Saint-Martin-d’Abbat",
  },
  "46": {
    name: "Lot",
    lon: 1.604,
    lat: 44.624,
    zip: "46240",
    city: "Soulomès",
  },
  "47": {
    name: "Lot-et-Garonne",
    lon: 0.46,
    lat: 44.367,
    zip: "47260",
    city: "Granges-sur-Lot",
  },
  "48": {
    name: "Lozère",
    lon: 3.5,
    lat: 44.517,
    zip: "48000",
    city: "Mende",
  },
  "49": {
    name: "Maine-et-Loire",
    lon: -0.564,
    lat: 47.39,
    zip: "49610",
    city: "Mûrs-Erigné",
  },
  "50": {
    name: "Manche",
    lon: 0.673,
    lat: 49.079,
    zip: "50210",
    city: "Camprond",
  },
  "51": {
    name: "Marne",
    lon: 4.238,
    lat: 48.949,
    zip: "51510",
    city: "Saint-Pierre",
  },
  "52": {
    name: "Haute-Marne",
    lon: 5.226,
    lat: 48.109,
    zip: "52000",
    city: "Chamarandes-Choignes",
  },
  "53": {
    name: "Mayenne",
    lon: -0.658,
    lat: 48.146,
    zip: "53950",
    city: "La Chapelle-Anthenaise",
  },
  "54": {
    name: "Meurthe-et-Moselle",
    lon: 6.165,
    lat: 48.786,
    zip: "54670",
    city: "Malleloy",
  },
  "55": {
    name: "Meuse",
    lon: 5.381,
    lat: 48.989,
    zip: "55220",
    city: "Récourt-le-Creux",
  },
  "56": {
    name: "Morbihan",
    lon: 1.19,
    lat: 47.846,
    zip: "56500",
    city: "Moustoir-Ac",
  },
  "57": {
    name: "Moselle",
    lon: 6.663,
    lat: 49.037,
    zip: "57380",
    city: "Guessling-Hémering",
  },
  "58": {
    name: "Nièvre",
    lon: 3.504,
    lat: 47.115,
    zip: "58330",
    city: "Saint-Saulge",
  },
  "59": {
    name: "Nord",
    lon: 3.22,
    lat: 50.447,
    zip: "59310",
    city: "Coutiches",
  },
  "60": {
    name: "Oise",
    lon: 2.425,
    lat: 49.41,
    zip: "60600",
    city: "Fitz-James",
  },
  "61": {
    name: "Orne",
    lon: 0.128,
    lat: 48.623,
    zip: "61500",
    city: "Belfonds",
  },
  "62": {
    name: "Pas-de-Calais",
    lon: 2.288,
    lat: 50.493,
    zip: "62134",
    city: "Fontaine-lès-Boulans",
  },
  "63": {
    name: "Puy-de-Dôme",
    lon: 3.14,
    lat: 45.725,
    zip: "63170",
    city: "Pérignat-lès-Sarliève",
  },
  "64": {
    name: "Pyrénées-Atlantiques",
    lon: -0.761,
    lat: 43.256,
    zip: "64190",
    city: "Gurs",
  },
  "65": {
    name: "Hautes-Pyrénées",
    lon: 0.163,
    lat: 43.053,
    zip: "65200",
    city: "Gerde",
  },
  "66": {
    name: "Pyrénées-Orientales",
    lon: 2.522,
    lat: 42.6,
    zip: "66320",
    city: "Finestret",
  },
  "67": {
    name: "Bas-Rhin",
    lon: 7.551,
    lat: 48.67,
    zip: "67370",
    city: "Schnersheim",
  },
  "68": {
    name: "Haut-Rhin",
    lon: 7.274,
    lat: 47.858,
    zip: "68540",
    city: "Feldkirch",
  },
  "69": {
    name: "Rhône",
    lon: 4.641,
    lat: 45.87,
    zip: "69380",
    city: "Châtillon",
  },
  "70": {
    name: "Haute-Saône",
    lon: 6.086,
    lat: 47.641,
    zip: "70000",
    city: "Montigny-lès-Vesoul",
  },
  "71": {
    name: "Saône-et-Loire",
    lon: 4.542,
    lat: 46.644,
    zip: "71460",
    city: "Collonge-en-Charollais",
  },
  "72": {
    name: "Sarthe",
    lon: 0.222,
    lat: 47.994,
    zip: "72000",
    city: "Le Mans",
  },
  "73": {
    name: "Savoie",
    lon: 6.443,
    lat: 45.477,
    zip: "73260",
    city: "Les Avanchers-Valmorel",
  },
  "74": {
    name: "Haute-Savoie",
    lon: 6.428,
    lat: 46.034,
    zip: "74130",
    city: "Brizon",
  },
  "75": {
    name: "Paris",
    lon: 2.342,
    lat: 48.856,
    zip: "75001",
    city: "Paris",
  },
  "76": {
    name: "Seine-Maritime",
    lon: 1.026,
    lat: 49.655,
    zip: "76890",
    city: "Varneville-Bretteville",
  },
  "77": {
    name: "Seine-et-Marne",
    lon: 2.933,
    lat: 48.626,
    zip: "77720",
    city: "Quiers",
  },
  "78": {
    name: "Yvelines",
    lon: 1.841,
    lat: 48.815,
    zip: "78490",
    city: "Vicq",
  },
  "79": {
    name: "Deux-Sèvres",
    lon: -0.317,
    lat: 46.555,
    zip: "79310",
    city: "Mazières-en-Gâtine",
  },
  "80": {
    name: "Somme",
    lon: 2.277,
    lat: 49.958,
    zip: "80260",
    city: "Bertangles",
  },
  "81": {
    name: "Tarn",
    lon: 2.166,
    lat: 43.785,
    zip: "81120",
    city: "Réalmont",
  },
  "82": {
    name: "Tarn-et-Garonne",
    lon: 1.281,
    lat: 44.085,
    zip: "82130",
    city: "Villemade",
  },
  "83": {
    name: "Var",
    lon: 6.218,
    lat: 43.46,
    zip: "83570",
    city: "Carcès",
  },
  "84": {
    name: "Vaucluse",
    lon: 5.186,
    lat: 43.993,
    zip: "84210",
    city: "Venasque",
  },
  "85": {
    name: "Vendée",
    lon: 0.703,
    lat: 46.674,
    zip: "85310",
    city: "La Chaize-le-Vicomte",
  },
  "86": {
    name: "Vienne",
    lon: 0.46,
    lat: 46.563,
    zip: "86800",
    city: "Saint-Julien-l’Ars",
  },
  "87": {
    name: "Haute-Vienne",
    lon: 1.235,
    lat: 45.891,
    zip: "87270",
    city: "Couzeix",
  },
  "88": {
    name: "Vosges",
    lon: 6.38,
    lat: 48.196,
    zip: "88390",
    city: "Uxegney",
  },
  "89": {
    name: "Yonne",
    lon: 3.564,
    lat: 47.839,
    zip: "89470",
    city: "Monéteau",
  },
  "90": {
    name: "Territoire de Belfort",
    lon: 6.928,
    lat: 47.631,
    zip: "90340",
    city: "Chèvremont",
  },
  "91": {
    name: "Essonne",
    lon: 2.243,
    lat: 48.522,
    zip: "91510",
    city: "Lardy",
  },
  "92": {
    name: "Hauts-de-Seine",
    lon: 2.245,
    lat: 48.847,
    zip: "92100",
    city: "Boulogne",
  },
  "93": {
    name: "Seine-Saint-Denis",
    lon: 2.478,
    lat: 48.917,
    zip: "93140",
    city: "Bondy",
  },
  "94": {
    name: "Val-de-Marne",
    lon: 2.468,
    lat: 48.777,
    zip: "94000",
    city: "Créteil",
  },
  "95": {
    name: "Val-d'Oise",
    lon: 2.131,
    lat: 49.082,
    zip: "95430",
    city: "Auvers-sur-Oise",
  },

  "Alsace-Champagne-Ardenne-Lorraine": {
    lon: 5.619,
    lat: 48.689,
    city: "Void",
  },
  "Aquitaine-Limousin-Poitou-Charentes": {
    lon: 0.197,
    lat: 45.192,
    city: "Saint-Vincent-Jalmoutiers",
  },
  "Auvergne-Rhône-Alpes": {
    lon: 4.538,
    lat: 45.515,
    city: "Cellieu",
  },
  "Bourgogne-Franche-Comté": {
    lon: 4.809,
    lat: 47.235,
    city: "Gergueil",
  },
  Bretagne: {
    lon: 1.162,
    lat: 48.179,
    city: "Saint-Caradec",
  },
  "Centre-Val-de-Loire": {
    lon: 1.685,
    lat: 47.48,
    city: "Vernou-en-Sologne",
  },
  Corse: {
    lon: 9.105,
    lat: 42.149,
    city: "Vivario",
  },
  "Ile-de-France": {
    lon: 2.504,
    lat: 48.709,
    city: "Brunoy",
  },
  "Languedoc-Roussillon-Midi-Pyrénées": {
    lon: 2.137,
    lat: 43.702,
    city: "Lautrec",
  },
  "Nord-Pas-de-Calais-Picardie": {
    lon: 2.775,
    lat: 49.966,
    city: "Maricourt",
  },
  Normandie: {
    lon: 0.106,
    lat: 49.121,
    city: "La Houblonnière",
  },
  "Pays-de-la-Loire": {
    lon: -0.823,
    lat: 47.474,
    city: "Saint-Augustin-des-Bois",
  },
  "Provence-Alpes-Côte-d'Azur": {
    lon: 6.053,
    lat: 43.955,
    city: "Entrevennes",
  },
};
/*const areas = {
  "01": { name: "Ain", lon: "5.2056", lat: "46.0558", zip: "01160", city: "Saint-Martin-du-Mont" },
  "02": { name: "Aisne", lon: "3.3330", lat: "49.3334", zip: "02000", city: "Clacy-et-Thierret" },
  "03": { name: "Allier", lon: "3.1118", lat: "46.2337", zip: "03240", city: "Treban" },
  "04": { name: "Alpes-de-Haute-Provence", lon: "6.1438", lat: "44.0622", zip: "04000", city: "Digne-les-Bains" },
  "05": { name: "Hautes-Alpes", lon: "6.1547", lat: "44.3949", zip: "05260", city: "Saint-Jean-Saint-Nicolas" },
  "06": { name: "Alpes-Maritimes", lon: "7.0659", lat: "43.5615", zip: "06710", city: "Massoins" },
  "07": { name: "Ardèche", lon: "4.2529", lat: "44.4506", zip: "07530", city: "Saint-Joseph-des-Bancs" },
  "08": { name: "Ardennes", lon: "4.3827", lat: "49.3656", zip: "08430", city: "Mazerny" },
  "09": { name: "Ariège", lon: "1.3014", lat: "42.5515", zip: "09000", city: "Brassac" },
  "10": { name: "Aube", lon: "4.0942", lat: "48.1816", zip: "10410", city: "Villechétif" },
  "11": { name: "Aude", lon: "2.2451", lat: "43.0612", zip: "11250", city: "Ladern-sur-Lauquet" },
  "12": { name: "Aveyron", lon: "2.4047", lat: "44.1649", zip: "12290", city: "Pont-de-Salars" },
  "13": { name: "Bouches-du-Rhône", lon: "5.0511", lat: "43.3236", zip: "13250", city: "Saint-Chamas" },
  "14": { name: "Calvados", lon: "-0.2149", lat: "49.0559", zip: "14320", city: "May-sur-Orne" },
  "15": { name: "Cantal", lon: "2.4007", lat: "45.0304", zip: "15800", city: "Thiézac" },
  "16": { name: "Charente", lon: "0.1206", lat: "45.4305", zip: "16430", city: "Champniers" },
  "17": { name: "Charente-Maritime", lon: "-0.4028", lat: "45.4651", zip: "17810", city: "Saint-Georges-des-Coteaux" },
  "18": { name: "Cher", lon: "2.2928", lat: "47.0353", zip: "18390", city: "Osmoy" },
  "19": { name: "Corrèze", lon: "1.5237", lat: "45.2125", zip: "19800", city: "Corrèze" },
  "2A": { name: "Corse-du-Sud", lon: "8.5917", lat: "41.5149", zip: "20190", city: "Santa-Maria-Siché" },
  "2B": { name: "Haute-Corse", lon: "9.1223", lat: "42.2339", zip: "20244", city: "Lano" },
  "21": { name: "Côte-d'Or", lon: "4.4620", lat: "47.2529", zip: "21440", city: "Saint-Martin-du-Mont" },
  "22": { name: "Côtes-d'Armor", lon: "-2.5151", lat: "48.2628", zip: "22800", city: "Plaine-Haute" },
  "23": { name: "Creuse", lon: "2.0108", lat: "46.0525", zip: "23150", city: "Ahun" },
  "24": { name: "Dordogne", lon: "0.4429", lat: "45.0615", zip: "24660", city: "Notre-Dame-de-Sanilhac" },
  "25": { name: "Doubs", lon: "6.2142", lat: "47.0955", zip: "25530", city: "Chevigney-lès-Vercel" },
  "26": { name: "Drôme", lon: "5.1005", lat: "44.4103", zip: "26340", city: "Saint-Sauveur-en-Diois" },
  "27": { name: "Eure", lon: "0.5946", lat: "49.0649", zip: "27110", city: "Quittebeuf" },
  "28": { name: "Eure-et-Loir", lon: "1.2213", lat: "48.2315", zip: "28120", city: "Nogent-sur-Eure" },
  "29": { name: "Finistère", lon: "-4.0332", lat: "48.1540", zip: "29590", city: "Lopérec" },
  "30": { name: "Gard", lon: "4.1049", lat: "43.5936", zip: "30190", city: "Boucoiran-et-Nozières" },
  "31": { name: "Haute-Garonne", lon: "1.1022", lat: "43.2131", zip: "31410", city: "Longages" },
  "32": { name: "Gers", lon: "0.2712", lat: "43.4134", zip: "32350", city: "Ordan-Larroque" },
  "33": { name: "Gironde", lon: "-0.3431", lat: "44.4931", zip: "33000", city: "Bordeaux" },
  "34": { name: "Hérault", lon: "3.2202", lat: "43.3447", zip: "34800", city: "Cabrières" },
  "35": { name: "Ille-et-Vilaine", lon: "-1.3819", lat: "48.0916", zip: "35830", city: "Betton" },
  "36": { name: "Indre", lon: "1.3433", lat: "46.4640", zip: "36250", city: "Niherne/Saint-Maur" },
  "37": { name: "Indre-et-Loire", lon: "0.4129", lat: "47.1529", zip: "37250", city: "Sorigny" },
  "38": { name: "Isère", lon: "5.3434", lat: "45.1548", zip: "38113", city: "Veurey-Voroize" },
  "39": { name: "Jura", lon: "5.4152", lat: "46.4342", zip: "39210", city: "La Marre" },
  "40": { name: "Landes", lon: "-0.4702", lat: "43.5756", zip: "40110", city: "Villenave" },
  "41": { name: "Loir-et-Cher", lon: "1.2546", lat: "47.3700", zip: "41350", city: "Saint-Claude-de-Diray" },
  "42": { name: "Loire", lon: "4.0957", lat: "45.4337", zip: "42110", city: "Poncins" },
  "43": { name: "Haute-Loire", lon: "3.4823", lat: "45.0741", zip: "43350", city: "Saint-Paulien" },
  "44": { name: "Loire-Atlantique", lon: "-1.4056", lat: "47.2141", zip: "44130", city: "Notre-Dame-des-Landes" },
  "45": { name: "Loiret", lon: "2.2039", lat: "47.5443", zip: "45110", city: "Saint-Martin-d’Abbat" },
  "46": { name: "Lot", lon: "1.3617", lat: "44.3727", zip: "46240", city: "Soulomès" },
  "47": { name: "Lot-et-Garonne", lon: "0.2737", lat: "44.2203", zip: "47260", city: "Granges-sur-Lot" },
  "48": { name: "Lozère", lon: "3.3001", lat: "44.3102", zip: "48000", city: "Mende" },
  "49": { name: "Maine-et-Loire", lon: "-0.3351", lat: "47.2327", zip: "49610", city: "Mûrs-Erigné" },
  "50": { name: "Manche", lon: "-1.1939", lat: "49.0446", zip: "50210", city: "Camprond" },
  "51": { name: "Marne", lon: "4.1419", lat: "48.5657", zip: "51510", city: "Saint-Pierre" },
  "52": { name: "Haute-Marne", lon: "5.1335", lat: "48.0634", zip: "52000", city: "Chamarandes-Choignes" },
  "53": { name: "Mayenne", lon: "-0.3929", lat: "48.0848", zip: "53950", city: "La Chapelle-Anthenaise" },
  "54": { name: "Meurthe-et-Moselle", lon: "6.0954", lat: "48.4713", zip: "54670", city: "Malleloy" },
  "55": { name: "Meuse", lon: "5.2254", lat: "48.5922", zip: "55220", city: "Récourt-le-Creux" },
  "56": { name: "Morbihan", lon: "-2.4836", lat: "47.5047", zip: "56500", city: "Moustoir-Ac" },
  "57": { name: "Moselle", lon: "6.3948", lat: "49.0214", zip: "57380", city: "Guessling-Hémering" },
  "58": { name: "Nièvre", lon: "3.3017", lat: "47.0655", zip: "58330", city: "Saint-Saulge" },
  "59": { name: "Nord", lon: "3.1314", lat: "50.2650", zip: "59310", city: "Coutiches" },
  "60": { name: "Oise", lon: "2.2531", lat: "49.2437", zip: "60600", city: "Fitz-James" },
  "61": { name: "Orne", lon: "0.0744", lat: "48.3725", zip: "61500", city: "Belfonds" },
  "62": { name: "Pas-de-Calais", lon: "2.1719", lat: "50.2937", zip: "62134", city: "Fontaine-lès-Boulans" },
  "63": { name: "Puy-de-Dôme", lon: "3.0827", lat: "45.4333", zip: "63170", city: "Pérignat-lès-Sarliève" },
  "64": { name: "Pyrénées-Atlantiques", lon: "-0.4541", lat: "43.1524", zip: "64190", city: "Gurs" },
  "65": { name: "Hautes-Pyrénées", lon: "0.0950", lat: "43.0311", zip: "65200", city: "Gerde" },
  "66": { name: "Pyrénées-Orientales", lon: "2.3120", lat: "42.3600", zip: "66320", city: "Finestret" },
  "67": { name: "Bas-Rhin", lon: "7.3305", lat: "48.4015", zip: "67370", city: "Schnersheim" },
  "68": { name: "Haut-Rhin", lon: "7.1627", lat: "47.5131", zip: "68540", city: "Feldkirch" },
  "69": { name: "Rhône", lon: "4.3829", lat: "45.5213", zip: "69380", city: "Châtillon" },
  "70": { name: "Haute-Saône", lon: "6.0510", lat: "47.3828", zip: "70000", city: "Montigny-lès-Vesoul" },
  "71": { name: "Saône-et-Loire", lon: "4.3232", lat: "46.3841", zip: "71460", city: "Collonge-en-Charollais" },
  "72": { name: "Sarthe", lon: "0.1320", lat: "47.5940", zip: "72000", city: "Le Mans" },
  "73": { name: "Savoie", lon: "6.2637", lat: "45.2839", zip: "73260", city: "Les Avanchers-Valmorel" },
  "74": { name: "Haute-Savoie", lon: "6.2541", lat: "46.0204", zip: "74130", city: "Brizon" },
  "75": { name: "Paris", lon: "2.2032", lat: "48.5124", zip: "75001", city: "Paris" },
  "76": { name: "Seine-Maritime", lon: "1.0135", lat: "49.3918", zip: "76890", city: "Varneville-Bretteville" },
  "77": { name: "Seine-et-Marne", lon: "2.5600", lat: "48.3736", zip: "77720", city: "Quiers" },
  "78": { name: "Yvelines", lon: "1.5030", lat: "48.4854", zip: "78490", city: "Vicq" },
  "79": { name: "Deux-Sèvres", lon: "-0.1902", lat: "46.3320", zip: "79310", city: "Mazières-en-Gâtine" },
  "80": { name: "Somme", lon: "2.1640", lat: "49.5729", zip: "80260", city: "Bertangles" },
  "81": { name: "Tarn", lon: "2.0958", lat: "43.4707", zip: "81120", city: "Réalmont" },
  "82": { name: "Tarn-et-Garonne", lon: "1.1655", lat: "44.0509", zip: "82130", city: "Villemade" },
  "83": { name: "Var", lon: "6.1305", lat: "43.2738", zip: "83570", city: "Carcès" },
  "84": { name: "Vaucluse", lon: "5.1110", lat: "43.5938", zip: "84210", city: "Venasque" },
  "85": { name: "Vendée", lon: "-1.1752", lat: "46.4029", zip: "85310", city: "La Chaize-le-Vicomte" },
  "86": { name: "Vienne", lon: "0.2737", lat: "46.3350", zip: "86800", city: "Saint-Julien-l’Ars" },
  "87": { name: "Haute-Vienne", lon: "1.1407", lat: "45.5330", zip: "87270", city: "Couzeix" },
  "88": { name: "Vosges", lon: "6.2250", lat: "48.1148", zip: "88390", city: "Uxegney" },
  "89": { name: "Yonne", lon: "3.3352", lat: "47.5023", zip: "89470", city: "Monéteau" },
  "90": { name: "Territoire de Belfort", lon: "6.5543", lat: "47.3754", zip: "90340", city: "Chèvremont" },
  "91": { name: "Essonne", lon: "2.1435", lat: "48.3120", zip: "91510", city: "Lardy" },
  "92": { name: "Hauts-de-Seine", lon: "2.1445", lat: "48.5050", zip: "92100", city: "Boulogne" },
  "93": { name: "Seine-Saint-Denis", lon: "2.2841", lat: "48.5503", zip: "93140", city: "Bondy" },
  "94": { name: "Val-de-Marne", lon: "2.2808", lat: "48.4639", zip: "94000", city: "Créteil" },
  "95": { name: "Val-d'Oise", lon: "2.0752", lat: "49.0458", zip: "95430", city: "Auvers-sur-Oise" },

  // Régions
  "Alsace-Champagne-Ardenne-Lorraine": { lon: "5.3710", lat: "48.4121", city: "Void" },
  "Aquitaine-Limousin-Poitou-Charentes": { lon: "0.1152", lat: "45.1132", city: "Saint-Vincent-Jalmoutiers" },
  "Auvergne-Rhône-Alpes": { lon: "4.3217", lat: "45.3057", city: "Cellieu" },
  "Bourgogne-Franche-Comté": { lon: "4.4833", lat: "47.1407", city: "Gergueil" },
  Bretagne: { lon: "-2.5019", lat: "48.1047", city: "Saint-Caradec" },
  "Centre-Val-de-Loire": { lon: "1.4107", lat: "47.2850", city: "Vernou-en-Sologne" },
  Corse: { lon: "9.0619", lat: "42.0859", city: "Vivario" },
  "Ile-de-France": { lon: "2.3017", lat: "48.4233", city: "Brunoy" },
  "Languedoc-Roussillon-Midi-Pyrénées": { lon: "2.0814", lat: "43.4208", city: "Lautrec" },
  "Nord-Pas-de-Calais-Picardie": { lon: "2.4631", lat: "49.5758", city: "Maricourt" },
  Normandie: { lon: "0.0624", lat: "49.0716", city: "La Houblonnière" },
  "Pays-de-la-Loire": { lon: "-0.4926", lat: "47.2829", city: "Saint-Augustin-des-Bois" },
  "Provence-Alpes-Côte-d'Azur": { lon: "6.0312", lat: "43.5718", city: "Entrevennes" },
};*/

const isArea = (area) => {
  console.log("isArea : ", area, areas[area]);

  return areas[area];
};

export { isArea };
